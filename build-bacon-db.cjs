#!/usr/bin/env node
/**
 * build-bacon-db.cjs — Stores full cast lists per movie for accurate verification
 * Output: public/bacon-db.json  and  public/movie-index.json
 */

const fs       = require("fs");
const zlib     = require("zlib");
const readline = require("readline");
const path     = require("path");

const KEVIN_BACON_ID    = "nm0000102";
const MAX_DEGREES       = 6;
const MAX_CAST_PER_FILM = 30;

function streamTSV(filename, onRow) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filename)) {
      reject(new Error(`File not found: ${filename}`)); return;
    }
    const rl = readline.createInterface({
      input: fs.createReadStream(filename).pipe(zlib.createGunzip()),
      crlfDelay: Infinity
    });
    let headers = null, count = 0;
    rl.on("line", line => {
      const cols = line.split("\t");
      if (!headers) { headers = cols; return; }
      const row = {};
      headers.forEach((h, i) => { row[h] = cols[i] === "\\N" ? null : cols[i]; });
      onRow(row);
      if (++count % 2000000 === 0) process.stdout.write(`   ${(count/1000000).toFixed(0)}M rows...\r`);
    });
    rl.on("close", () => { process.stdout.write("\n"); resolve(count); });
    rl.on("error", reject);
  });
}

async function main() {
  console.log("\n🥓 Kevin Bacon Database Builder\n");

  // ── Step 1: Actor names ────────────────────────────────────────────────────
  console.log("📥 Step 1: Scanning actors...");
  const idToName = {};
  await streamTSV("name.basics.tsv.gz", row => {
    if (!row.primaryProfession) return;
    const profs = row.primaryProfession.split(",");
    if (!profs.includes("actor") && !profs.includes("actress")) return;
    const credits = row.knownForTitles ? row.knownForTitles.split(",").filter(Boolean).length : 0;
    if (credits < 2 && row.nconst !== KEVIN_BACON_ID) return;
    idToName[row.nconst] = row.primaryName;
  });
  console.log(`   Kept ${Object.keys(idToName).length.toLocaleString()} actors`);

  // ── Step 2: Movie titles ───────────────────────────────────────────────────
  console.log("📥 Step 2: Scanning movies...");
  const movieTitles = {};   // tconst → "Title (YYYY)"
  const movieTypes = {};    // tconst → "movie" | "tvMovie"  (prefer theatrical)
  const titleToIds = {};    // "title (yyyy)" → [tconst, ...]  (detect duplicates)

  await streamTSV("title.basics.tsv.gz", row => {
    if (row.titleType !== "movie" && row.titleType !== "tvMovie") return;
    const year = row.startYear ? ` (${row.startYear})` : "";
    const label = `${row.primaryTitle}${year}`;
    movieTitles[row.tconst] = label;
    movieTypes[row.tconst]  = row.titleType;
    if (!titleToIds[label]) titleToIds[label] = [];
    titleToIds[label].push(row.tconst);
  });
  console.log(`   Kept ${Object.keys(movieTitles).length.toLocaleString()} movies`);

  // ── Step 3: Build movie→actors AND actor→actor graph simultaneously ────────
  console.log("📥 Step 3: Building cast lists and graph...");
  const graph = {};  // actorId → ["toId|movieId", ...]  (for BFS)

  // Collect cast with ordering number so we can sort by billing order
  const movieToActorsRaw = {}; // movieId → [{nconst, ordering}]
  await streamTSV("title.principals.tsv.gz", row => {
    if (!movieTitles[row.tconst]) return;
    if (!row.nconst || !idToName[row.nconst]) return;
    if (row.category !== "actor" && row.category !== "actress") return;
    if (!movieToActorsRaw[row.tconst]) movieToActorsRaw[row.tconst] = [];
    // Store all cast members with their billing order
    movieToActorsRaw[row.tconst].push({
      nconst: row.nconst,
      ordering: parseInt(row.ordering) || 99
    });
  });

  // Sort each movie's cast by billing order, then take top MAX_CAST_PER_FILM
  const movieToActors = {};
  for (const [movieId, cast] of Object.entries(movieToActorsRaw)) {
    cast.sort((a, b) => a.ordering - b.ordering);
    movieToActors[movieId] = cast.slice(0, MAX_CAST_PER_FILM).map(c => c.nconst);
  }
  console.log(`   Collected cast for ${Object.keys(movieToActors).length.toLocaleString()} movies`);

  // Second pass: build graph from cast lists
  console.log("   Building actor graph...");
  let mc = 0;
  for (const [movieId, actors] of Object.entries(movieToActors)) {
    if (actors.length < 2) continue;
    for (let i = 0; i < actors.length; i++) {
      for (let j = i + 1; j < actors.length; j++) {
        const a = actors[i], b = actors[j];
        if (!graph[a]) graph[a] = [];
        if (!graph[b]) graph[b] = [];
        graph[a].push(`${b}|${movieId}`);
        graph[b].push(`${a}|${movieId}`);
      }
    }
    if (++mc % 100000 === 0) process.stdout.write(`   ${mc.toLocaleString()} movies...\r`);
  }
  process.stdout.write("\n");
  console.log(`   Graph: ${Object.keys(graph).length.toLocaleString()} actors`);

  // ── Step 4: BFS from Kevin Bacon ──────────────────────────────────────────
  console.log("🥓 Step 4: BFS from Kevin Bacon...");
  const degree = {}, parent = {};
  const queue  = [KEVIN_BACON_ID];
  degree[KEVIN_BACON_ID] = 0;
  parent[KEVIN_BACON_ID] = null;

  let visited = 0;
  while (queue.length > 0) {
    const cur = queue.shift();
    const deg = degree[cur];
    if (deg >= MAX_DEGREES) continue;
    for (const edge of (graph[cur] || [])) {
      const pipe = edge.indexOf("|");
      const to   = edge.slice(0, pipe);
      const mov  = edge.slice(pipe + 1);
      if (degree[to] !== undefined) continue;
      degree[to] = deg + 1;
      parent[to] = { from: cur, movie: mov };
      queue.push(to);
    }
    if (++visited % 200000 === 0) process.stdout.write(`   ${visited.toLocaleString()} visited...\r`);
  }
  for (const k of Object.keys(graph)) delete graph[k]; // free memory
  process.stdout.write("\n");
  console.log(`   Connected: ${Object.keys(degree).length.toLocaleString()} actors`);

  // ── Step 5: Write bacon-db.json (actor paths) ─────────────────────────────
  console.log("💾 Step 5: Writing bacon-db.json...");
  if (!fs.existsSync("public")) fs.mkdirSync("public");

  console.log("   Building actor database object...");
  const baconObj = {};
  let written = 0;
  for (const [id, deg] of Object.entries(degree)) {
    const name = idToName[id];
    if (!name) continue;
    const steps = [];
    let cur = id;
    while (parent[cur]) {
      const { from, movie } = parent[cur];
      steps.unshift({ from: idToName[from]||from, movie: movieTitles[movie]||movie, to: idToName[cur]||cur });
      cur = from;
    }
    baconObj[name.toLowerCase()] = { name, degrees: deg, path: steps };
    written++;
    if (written % 100000 === 0) process.stdout.write(`   ${written.toLocaleString()} actors...\r`);
  }
  process.stdout.write("\n");
  fs.writeFileSync(path.join("public", "bacon-db.json"), JSON.stringify(baconObj));
  console.log(`   Written: ${written.toLocaleString()} actors`);

  // ── Step 6: Write movie-index.json (movie → actor names) ──────────────────
  console.log("💾 Step 6: Writing movie-index.json...");
  console.log("   Building movie index object...");
  const movieObj = {};
  let mWritten = 0;
  for (const [movieId, actors] of Object.entries(movieToActors)) {
    const title = movieTitles[movieId];
    if (!title || actors.length < 2) continue;
    const names = actors.map(id => idToName[id]).filter(Boolean).map(n => n.toLowerCase());
    if (names.length < 2) continue;
    const key = title.toLowerCase();
    // If two movies share the same title+year key, prefer theatrical over TV movie
    if (movieObj[key]) {
      const existingType = movieTypes[movieId];
      if (existingType === "tvMovie") continue; // skip — theatrical already stored
    }
    movieObj[key] = names;
    mWritten++;
    if (mWritten % 50000 === 0) process.stdout.write(`   ${mWritten.toLocaleString()} movies...\r`);
  }
  process.stdout.write("\n");
  fs.writeFileSync(path.join("public", "movie-index.json"), JSON.stringify(movieObj));


  const dbSize    = (fs.statSync(path.join("public","bacon-db.json")).size/1024/1024).toFixed(1);
  const idxSize   = (fs.statSync(path.join("public","movie-index.json")).size/1024/1024).toFixed(1);
  console.log(`\n✅ Done!`);
  console.log(`   public/bacon-db.json:     ${dbSize} MB  (${written.toLocaleString()} actors)`);
  console.log(`   public/movie-index.json:  ${idxSize} MB  (${mWritten.toLocaleString()} movies)`);
  console.log(`\n   Degree breakdown:`);
  const counts = {};
  for (const d of Object.values(degree)) counts[d]=(counts[d]||0)+1;
  for (const [d,c] of Object.entries(counts).sort()) console.log(`     ${d} degrees: ${c.toLocaleString()}`);
  console.log(`\n   Restart your dev server — the game will use these files automatically.`);
}

main().catch(err => { console.error("\n❌ Error:", err.message); process.exit(1); });

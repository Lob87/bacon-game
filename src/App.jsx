import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ACTOR POOLS
// ─────────────────────────────────────────────────────────────────────────────
const ACTOR_POOLS = {
  easy: [
    // Mega-famous A-listers with huge filmographies — everyone knows them
    "Tom Hanks","Meryl Streep","Leonardo DiCaprio","Brad Pitt","Julia Roberts",
    "Denzel Washington","George Clooney","Angelina Jolie","Matt Damon","Will Smith",
    "Tom Cruise","Sandra Bullock","Robert De Niro","Al Pacino","Harrison Ford",
    "Morgan Freeman","Jodie Foster","Dustin Hoffman","Jack Nicholson","Cate Blanchett",
    "Nicole Kidman","Reese Witherspoon","Halle Berry","Hugh Jackman","Russell Crowe",
    "Johnny Depp","Nicolas Cage","Sylvester Stallone","Arnold Schwarzenegger","Bruce Willis",
    "Eddie Murphy","Robin Williams","Jim Carrey","Whoopi Goldberg","Michael Douglas",
    "Sharon Stone","Demi Moore","Richard Gere","Mel Gibson","Goldie Hawn",
    "Samuel L. Jackson","Scarlett Johansson","Robert Downey Jr.","Emma Stone","Ryan Gosling",
    "Chris Evans","Chris Hemsworth","Natalie Portman","Margot Robbie","Anne Hathaway",
    "Jake Gyllenhaal","Amy Adams","Jessica Chastain","Viola Davis","Idris Elba",
    "Mahershala Ali","Chadwick Boseman","Michael B. Jordan","Lupita Nyongo","Daniel Craig",
    "Judi Dench","Anthony Hopkins","Helen Mirren","Ian McKellen","Gary Oldman",
    "Christian Bale","Joaquin Phoenix","Benedict Cumberbatch","Emily Blunt","Keira Knightley",
    "Kate Winslet","Rachel Weisz","Sigourney Weaver","Susan Sarandon","Diane Keaton",
    "Gene Hackman","Robert Duvall","Dustin Hoffman","Warren Beatty","Jack Lemmon",
    "Walter Matthau","Cary Grant","James Stewart","Henry Fonda","Gregory Peck",
    "Humphrey Bogart","Katharine Hepburn","Audrey Hepburn","Grace Kelly","Bette Davis",
    "Marlon Brando","Paul Newman","Steve McQueen","Clint Eastwood","John Wayne",
    "Sean Connery","Michael Caine","Peter O'Toole","Richard Burton","Laurence Olivier",
    "Charlize Theron","Halle Berry","Salma Hayek","Penelope Cruz","Catherine Zeta-Jones",
    "Jennifer Lopez","Jennifer Aniston","Courteney Cox","Lisa Kudrow","Matthew Perry",
    "Bill Murray","Dan Aykroyd","Chevy Chase","Steve Martin","Martin Short",
    "John Belushi","Richard Pryor","Gene Wilder","Mel Brooks","Woody Allen",
    "Liam Neeson","Ewan McGregor","Colin Firth","Hugh Grant","Ralph Fiennes",
    "Kevin Costner","Alec Baldwin","Jeff Bridges","Kurt Russell","Tommy Lee Jones",
    "Danny DeVito","Joe Pesci","Ray Liotta","Harvey Keitel","Christopher Walken",
    "Tim Robbins","John Travolta","Jeff Goldblum","Billy Crystal","Robin Wright",
  ],
  medium: [
    // Great actors, very well known, but typically supporting or character roles
    "John Goodman","Bill Paxton","Gary Sinise","Joan Cusack","William H. Macy",
    "Steve Buscemi","Stanley Tucci","Tilda Swinton","Catherine Keener","Laura Linney",
    "Richard Jenkins","Michael Shannon","Sam Rockwell","Michael Pena","Allison Janney",
    "Marcia Gay Harden","Melissa Leo","Amy Ryan","Clancy Brown","Ving Rhames",
    "Don Cheadle","Frances McDormand","Holly Hunter","Mary Steenburgen","Lorraine Bracco",
    "Dylan Baker","J.K. Simmons","Tony Shalhoub","Philip Seymour Hoffman","Paul Giamatti",
    "Bob Balaban","Annabeth Gish","Kathy Bates","Jeffrey Wright","Chiwetel Ejiofor",
    "Wendell Pierce","Clarke Peters","Andre Braugher","Aidan Quinn","Dylan McDermott",
    "Thomas Haden Church","Paul Dano","Zach Galifianakis","Michael Stuhlbarg","Shea Whigham",
    "David Harbour","Rainn Wilson","John Carroll Lynch","Walton Goggins","Michael Kelly",
    "Lili Taylor","Catherine O'Hara","Parker Posey","Joan Allen","Mary McDonnell",
    "Alfre Woodard","Angela Bassett","CCH Pounder","S. Epatha Merkerson","Regina King",
    "William Hurt","Ed Harris","Albert Finney","Tom Wilkinson","Derek Jacobi",
    "Bill Nighy","Pete Postlethwaite","Timothy Spall","Jim Broadbent","Brendan Gleeson",
    "Ciaran Hinds","Colm Meaney","Brian Cox","Ian Holm","John Hurt",
    "Dennis Quaid","Thomas Jane","Timothy Olyphant","Josh Brolin","Dermot Mulroney",
    "Kyle Chandler","Norbert Leo Butz","Michael Emerson","Terry O'Quinn","William Sadler",
    "James Rebhorn","Richard Schiff","Bradley Whitford","Rob Lowe","Dulé Hill",
    "Peter Sarsgaard","Alessandro Nivola","Liev Schreiber","Eric Bana","Joel Edgerton",
    "Ryan Phillippe","Barry Pepper","Giovanni Ribisi","Casey Affleck","Mark Ruffalo",
    "Steve Zahn","Giovanni Ribisi","Jason Bateman","Ben Mendelsohn","Scoot McNairy",
    "Oscar Isaac","Adam Driver","Michael Fassbender","James McAvoy","Tom Hardy",
    "Joel Kinnaman","Nikolaj Coster-Waldau","Aidan Gillen","Charles Dance","Stephen Dillane",
    "Enrico Colantoni","Callum Keith Rennie","Aaron Douglas","Alessandro Juliani","Tahmoh Penikett",
  ],
  hard: [
    // Classic Hollywood character actors, cult figures, rarely leads
    "Buster Keaton","Harold Lloyd","Edward G. Robinson","Peter Lorre","Claude Rains",
    "Charles Laughton","Walter Brennan","Elisha Cook Jr.","Ward Bond","Frank McHugh",
    "Strother Martin","Slim Pickens","Ben Johnson","Harry Dean Stanton","M. Emmet Walsh",
    "Richard Farnsworth","Warren Oates","L.Q. Jones","Wilford Brimley","Charles Durning",
    "Paul Dooley","William Sanderson","Levon Helm","Rip Torn","Bruce Dern",
    "John Cazale","Michael Lerner","Ron Silver","Tom Noonan","Ted Levine",
    "Geoffrey Lewis","Robert Wuhl","Fred Dalton Thompson","James Gammon","Noble Willingham",
    "Richard Dysart","Marc Lawrence","Barton MacLane","Frank Faylen","James Gleason",
    "Charles Bickford","Thomas Mitchell","Edward Arnold","Eugene Pallette","Guy Kibbee",
    "Allen Jenkins","Frank Jenks","Roscoe Karns","Regis Toomey","Donald Meek",
    "Porter Hall","Mischa Auer","Charles Coburn","Edmund Gwenn","S.Z. Sakall",
    "Alan Mowbray","Sig Ruman","Walter Catlett","Eric Blore","Franklin Pangborn",
    "Hattie McDaniel","Louise Beavers","Willie Best","Mantan Moreland","Stepin Fetchit",
    "Lionel Stander","Allen Jenkins","Ralph Bellamy","Lee Patrick","Gladys George",
    "Victor Buono","Robert Middleton","Jack Elam","Neville Brand","Leo Gordon",
    "Dub Taylor","Denver Pyle","Royal Dano","John Qualen","Edgar Buchanan",
    "Chill Wills","Andy Devine","Walter Brennan","Fuzzy Knight","Gabby Hayes",
    "Arthur Hunnicutt","Jack Oakie","William Demarest","Edgar Kennedy","Harry Langdon",
    "Guy Kibbee","Ned Sparks","Frank McHugh","Allen Jenkins","Warren Hymer",
    "Marc Lawrence","Sheldon Leonard","George Raft","César Romero","Ricardo Cortez",
    "Akim Tamiroff","J. Carrol Naish","Vladimir Sokoloff","Martin Kosleck","Hans Heinrich von Twardowski",
    "Elisha Cook Jr.","Lawrence Tierney","Charles McGraw","Richard Conte","John Ireland",
    "Whit Bissell","Robert Bray","Frank Ferguson","Dabbs Greer","Olan Soule",
    "James Whitmore","Eduard Franz","Paul Fix","Morris Ankrum","John Doucette",
  ],
};

const WEEKLY_THEMES = [
  { name:"80s Action Heroes",   actors:["Arnold Schwarzenegger","Sylvester Stallone","Bruce Willis","Mel Gibson","Harrison Ford","Chuck Norris","Steven Seagal","Jean-Claude Van Damme","Dolph Lundgren","Carl Weathers"] },
  { name:"Oscar Royalty",       actors:["Meryl Streep","Cate Blanchett","Jodie Foster","Jack Nicholson","Dustin Hoffman","Katharine Hepburn","Bette Davis","Olivia de Havilland","Vivien Leigh","Jennifer Lawrence"] },
  { name:"Indie Darlings",      actors:["Steve Buscemi","Frances McDormand","Philip Seymour Hoffman","Tilda Swinton","Paul Giamatti","Parker Posey","Lili Taylor","John Turturro","Stanley Tucci","Laura Linney"] },
  { name:"90s Blockbusters",    actors:["Tom Hanks","Julia Roberts","Will Smith","Jim Carrey","Whoopi Goldberg","Sandra Bullock","Keanu Reeves","Harrison Ford","Tommy Lee Jones","Mel Gibson"] },
  { name:"Method Masters",      actors:["Robert De Niro","Al Pacino","Dustin Hoffman","Daniel Day-Lewis","Joaquin Phoenix","Marlon Brando","James Dean","Montgomery Clift","Paul Newman","Jack Nicholson"] },
  { name:"Marvel Universe",     actors:["Robert Downey Jr.","Chris Evans","Scarlett Johansson","Chris Hemsworth","Mark Ruffalo","Jeremy Renner","Anthony Mackie","Sebastian Stan","Paul Rudd","Brie Larson"] },
  { name:"Classic Hollywood",   actors:["Cary Grant","James Stewart","Henry Fonda","Gregory Peck","Humphrey Bogart","Gary Cooper","Clark Gable","Spencer Tracy","Burt Lancaster","Kirk Douglas"] },
  { name:"British Invasion",    actors:["Anthony Hopkins","Helen Mirren","Ian McKellen","Judi Dench","Gary Oldman","Colin Firth","Hugh Grant","Ralph Fiennes","Keira Knightley","Kate Winslet"] },
  { name:"Comedy Legends",      actors:["Bill Murray","Dan Aykroyd","Chevy Chase","Steve Martin","Eddie Murphy","Robin Williams","Gene Wilder","Richard Pryor","John Belushi","Dan Aykroyd"] },
  { name:"Crime Cinema",        actors:["Joe Pesci","Ray Liotta","Harvey Keitel","Christopher Walken","James Caan","Robert Duvall","Gene Hackman","Dennis Hopper","John Turturro","Steve Buscemi"] },
  { name:"Modern Prestige",     actors:["Cate Blanchett","Viola Davis","Meryl Streep","Nicole Kidman","Natalie Portman","Charlize Theron","Halle Berry","Reese Witherspoon","Hilary Swank","Frances McDormand"] },
  { name:"Western Legends",     actors:["Clint Eastwood","John Wayne","Henry Fonda","James Stewart","Gary Cooper","Kirk Douglas","Burt Lancaster","Glenn Ford","Randolph Scott","Joel McCrea"] },
];

const ALL_ACTORS = [
  "Kevin Bacon","Tom Hanks","Meryl Streep","Robert De Niro","Cate Blanchett",
  "Brad Pitt","Natalie Portman","Leonardo DiCaprio","Julia Roberts","Denzel Washington",
  "Sandra Bullock","Morgan Freeman","Johnny Depp","Halle Berry","Will Smith",
  "Kate Winslet","George Clooney","Angelina Jolie","Matt Damon","Nicole Kidman",
  "Samuel L. Jackson","Reese Witherspoon","Russell Crowe","Emma Stone","Al Pacino",
  "Jodie Foster","Dustin Hoffman","Sigourney Weaver","Harrison Ford","Judi Dench",
  "Anthony Hopkins","Helena Bonham Carter","Hugh Jackman","Idris Elba","Viola Davis",
  "Scarlett Johansson","Chris Evans","Robert Downey Jr.","Tom Holland","Ryan Gosling",
  "Emily Blunt","Jake Gyllenhaal","Amy Adams","Jessica Chastain","Michael B. Jordan",
  "Daniel Craig","Joaquin Phoenix","Eddie Redmayne","Margot Robbie","Bill Murray",
  "Eddie Murphy","Steve Martin","Robin Williams","Jim Carrey","Adam Sandler",
  "Ben Stiller","Paul Rudd","Dwayne Johnson","Sylvester Stallone","Arnold Schwarzenegger",
  "Bruce Willis","Tom Cruise","Nicolas Cage","Gary Oldman","Ian McKellen",
  "Patrick Stewart","Michael Caine","Helen Mirren","Keira Knightley","Rachel Weisz",
  "Ewan McGregor","Liam Neeson","Pierce Brosnan","Ralph Fiennes","Tilda Swinton",
  "Julianne Moore","Naomi Watts","Uma Thurman","John Goodman","Bill Paxton",
  "Tim Robbins","William H. Macy","Steve Buscemi","Stanley Tucci","Philip Seymour Hoffman",
  "Paul Giamatti","J.K. Simmons","Don Cheadle","Jeff Bridges","Kurt Russell",
  "Kathy Bates","Frances McDormand","Holly Hunter","Mahershala Ali","Sam Rockwell",
  "Chiwetel Ejiofor","Richard Jenkins","Michael Shannon","Jack Nicholson","Sharon Stone",
  "Charlize Theron","Mel Gibson","Goldie Hawn","Michael Douglas","Demi Moore",
  "Anne Hathaway","Chadwick Boseman","Lupita Nyong'o","Zendaya","Timothee Chalamet",
  "Florence Pugh","Ana de Armas","Chris Hemsworth","Mark Ruffalo","Jeremy Renner",
  "Benedict Cumberbatch","Oscar Isaac","Adam Driver","Brie Larson","Saoirse Ronan",
  "Taron Egerton","Richard Madden","Gal Gadot","Jason Momoa","Ezra Miller",
  "Henry Cavill","Ben Affleck","Christian Bale","Cillian Murphy","Tom Hardy",
  "Aaron Taylor-Johnson","Paul Bettany","Hayley Atwell","Elizabeth Olsen","Karen Gillan",
  "Dave Bautista","Pom Klementieff","Bradley Cooper","Jennifer Lawrence","Josh Hutcherson",
  "Liam Hemsworth","Woody Harrelson","Sean Penn","Tim Roth","Forest Whitaker",
  "Adrien Brody","Hilary Swank","Gwyneth Paltrow","Renee Zellweger","Maggie Smith",
  "Cary Grant","James Stewart","Henry Fonda","Gregory Peck","Humphrey Bogart",
  "Gary Cooper","Clark Gable","Spencer Tracy","Burt Lancaster","Kirk Douglas",
  "Katharine Hepburn","Bette Davis","Audrey Hepburn","Grace Kelly","Ingrid Bergman",
  "Vivien Leigh","Olivia de Havilland","Joan Crawford","Barbara Stanwyck","Claudette Colbert",
  "Marlon Brando","Paul Newman","Steve McQueen","Clint Eastwood","John Wayne",
  "Sean Connery","Peter O'Toole","Richard Burton","Laurence Olivier","Rex Harrison",
  "Gene Hackman","Robert Duvall","Warren Beatty","Jack Lemmon","Walter Matthau",
  "Charlton Heston","Yul Brynner","William Holden","Glenn Ford","James Cagney",
  "Edward G. Robinson","Peter Lorre","Claude Rains","Charles Laughton","Walter Brennan",
  "Thomas Mitchell","Ward Bond","John Qualen","Dan Aykroyd","Chevy Chase",
  "Martin Short","John Belushi","Richard Pryor","Gene Wilder","Mel Brooks",
  "Woody Allen","Bob Hope","Bing Crosby","Jack Benny","Red Skelton",
  "Danny Kaye","Jerry Lewis","Dean Martin","Frank Sinatra","Sammy Davis Jr.",
  "Joey Bishop","Allison Janney","Amy Ryan","Melissa Leo","Marcia Gay Harden",
  "Gary Sinise","Ed Harris","John Lithgow","Joan Cusack","Catherine Keener",
  "Laura Linney","Clancy Brown","Ving Rhames","Tony Shalhoub","Bob Balaban",
  "Dylan Baker","Harry Dean Stanton","M. Emmet Walsh","Bruce Dern","Rip Torn",
  "John Cazale","Warren Oates","Wilford Brimley","Charles Durning","Paul Dooley",
  "Geoffrey Lewis","Strother Martin","Slim Picks","Ben Johnson","Ted Levine",
  "Tom Noonan","Jason Statham","Vin Diesel","The Rock","Jackie Chan",
  "Jet Li","Jean-Claude Van Damme","Steven Seagal","Chuck Norris","Carl Weathers",
  "Wesley Snipes","Val Kilmer","Mickey Rourke","Susan Sarandon","Diane Keaton",
  "Sally Field","Jessica Lange","Sissy Spacek","Faye Dunaway","Jane Fonda",
  "Ellen Burstyn","Whoopi Goldberg","Marion Cotillard","Penelope Cruz","Octavia Spencer",
  "Olivia Colman","Ron Howard","Kevin Costner","Barbra Streisand","Antonio Banderas",
  "Javier Bardem","Salma Hayek","Sofia Vergara","Chow Yun-fat","Tony Leung",
  "Gong Li","Zhang Ziyi","Christoph Waltz","Daniel Bruhl","Diane Kruger",
  "Til Schweiger","Mads Mikkelsen","Viggo Mortensen","Nikolaj Coster-Waldau","Alexander Skarsgard",
  "Joel Kinnaman","Alicia Vikander","Bryan Cranston","Aaron Paul","Jon Hamm",
  "January Jones","Elisabeth Moss","Matthew McConaughey","Michelle Monaghan","Colin Farrell",
  "Rachel McAdams","Jennifer Aniston","Courteney Cox","Lisa Kudrow","Matt LeBlanc",
  "Matthew Perry","David Schwimmer","Bob Odenkirk","Jonathan Banks","Giancarlo Esposito",
];

const ACHIEVEMENTS = [
  { id:"first_win",    icon:"🥓", name:"First Bacon",      desc:"Win your first game" },
  { id:"speed2",       icon:"⚡", name:"Lightning",         desc:"Connect in 2 degrees" },
  { id:"speed3",       icon:"🚀", name:"Speed Demon",       desc:"Connect in 3 degrees" },
  { id:"perfect",      icon:"🎯", name:"Perfect Line",      desc:"Win without using a hint" },
  { id:"streak3",      icon:"🔥", name:"On Fire",           desc:"Win 3 games in a row" },
  { id:"streak5",      icon:"🌋", name:"Unstoppable",       desc:"Win 5 games in a row" },
  { id:"hard_win",     icon:"💀", name:"Hard Boiled",       desc:"Beat Hard difficulty" },
  { id:"daily",        icon:"📅", name:"Daily Devotee",     desc:"Complete a Daily Challenge" },
  { id:"weekly",       icon:"📆", name:"Weekly Warrior",    desc:"Complete a Weekly Challenge" },
  { id:"no_hint_hard", icon:"🧠", name:"Big Brain",         desc:"Beat Hard with no hints" },
  { id:"ten_wins",     icon:"🏆", name:"Bacon Collector",   desc:"Win 10 total games" },
  { id:"two_player",   icon:"👥", name:"Head to Head",      desc:"Play a 2-player game" },
  { id:"speed_mode",   icon:"⏱️", name:"Under Pressure",    desc:"Win in Timed Mode" },
  { id:"reverse",      icon:"🔄", name:"Backwards Bacon",   desc:"Win a Reverse game" },
  { id:"shared",       icon:"📤", name:"Spreading the Word",desc:"Share a result" },
];

function getDailyActor(diff) {
  const pool = ACTOR_POOLS[diff];
  const day = Math.floor(Date.now() / 86400000);
  return pool[day % pool.length];
}

function getWeeklyTheme() {
  const week = Math.floor(Date.now() / (86400000 * 7));
  return WEEKLY_THEMES[week % WEEKLY_THEMES.length];
}

function loadStats() {
  try {
    const s = localStorage.getItem("bacon_stats_v2");
    if (s) return JSON.parse(s);
  } catch {}
  return {
    wins:0, losses:0, streak:0, bestStreak:0, totalDegrees:0, bestDegrees:999,
    achievements:[], history:[], dailyPlayed:{}, weeklyPlayed:{},
    settings:{ sound:true, haptics:true, theme:"dark" },
    savedGame: null,
  };
}
function saveStats(s) { try { localStorage.setItem("bacon_stats_v2", JSON.stringify(s)); } catch {} }

// ─────────────────────────────────────────────────────────────────────────────
// AUDIO
// ─────────────────────────────────────────────────────────────────────────────
function useAudio() {
  const ctx = useRef(null);
  function ac() {
    if (!ctx.current) ctx.current = new (window.AudioContext||window.webkitAudioContext)();
    if (ctx.current.state==="suspended") ctx.current.resume();
    return ctx.current;
  }
  return {
    playError() {
      const a=ac(),o=a.createOscillator(),g=a.createGain();
      o.connect(g);g.connect(a.destination);o.type="sawtooth";
      o.frequency.setValueAtTime(220,a.currentTime);
      o.frequency.exponentialRampToValueAtTime(110,a.currentTime+0.3);
      g.gain.setValueAtTime(0.4,a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+0.4);
      o.start();o.stop(a.currentTime+0.4);
    },
    playLose() {
      const a=ac();
      [0,0.3,0.6].forEach((t,i)=>{
        const o=a.createOscillator(),g=a.createGain();
        o.connect(g);g.connect(a.destination);o.type="triangle";
        o.frequency.setValueAtTime([300,250,180][i],a.currentTime+t);
        g.gain.setValueAtTime(0.35,a.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+t+0.28);
        o.start(a.currentTime+t);o.stop(a.currentTime+t+0.3);
      });
    },
    playCheer() {
      const a=ac();
      [523,659,784,1047,1319].forEach((f,i)=>{
        const o=a.createOscillator(),g=a.createGain();
        o.connect(g);g.connect(a.destination);o.type="sine";
        o.frequency.setValueAtTime(f,a.currentTime+i*0.12);
        g.gain.setValueAtTime(0,a.currentTime+i*0.12);
        g.gain.linearRampToValueAtTime(0.3,a.currentTime+i*0.12+0.05);
        g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+i*0.12+0.35);
        o.start(a.currentTime+i*0.12);o.stop(a.currentTime+i*0.12+0.4);
      });
    },
    playClick() {
      const a=ac(),buf=a.createBuffer(1,a.sampleRate*0.05,a.sampleRate);
      const d=buf.getChannelData(0);
      for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*(1-i/d.length);
      const s=a.createBufferSource(),g=a.createGain();
      s.buffer=buf;s.connect(g);g.connect(a.destination);
      g.gain.setValueAtTime(0.15,a.currentTime);s.start();
    },
    playHint() {
      const a=ac();
      [440,554,659].forEach((f,i)=>{
        const o=a.createOscillator(),g=a.createGain();
        o.connect(g);g.connect(a.destination);o.type="sine";
        o.frequency.setValueAtTime(f,a.currentTime+i*0.1);
        g.gain.setValueAtTime(0.2,a.currentTime+i*0.1);
        g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+i*0.1+0.3);
        o.start(a.currentTime+i*0.1);o.stop(a.currentTime+i*0.1+0.3);
      });
    },
    playTick() {
      const a=ac(),o=a.createOscillator(),g=a.createGain();
      o.connect(g);g.connect(a.destination);o.type="square";
      o.frequency.setValueAtTime(880,a.currentTime);
      g.gain.setValueAtTime(0.08,a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+0.05);
      o.start();o.stop(a.currentTime+0.05);
    },
    playUrgent() {
      const a=ac();
      [0,0.15].forEach(t=>{
        const o=a.createOscillator(),g=a.createGain();
        o.connect(g);g.connect(a.destination);o.type="square";
        o.frequency.setValueAtTime(440,a.currentTime+t);
        g.gain.setValueAtTime(0.15,a.currentTime+t);
        g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+t+0.12);
        o.start(a.currentTime+t);o.stop(a.currentTime+t+0.13);
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// OFFLINE DATABASE LOADER
// Loads bacon-db.json (built by build-bacon-db.js) once on startup.
// Put bacon-db.json in the /public folder of your Vite project.
// ─────────────────────────────────────────────────────────────────────────────
let BACON_DB = null;
let MOVIE_INDEX = {};
let baconDBLoadPromise = null;

function loadBaconDB() {
  if (baconDBLoadPromise) return baconDBLoadPromise;
  const DB_BASE = "https://pub-91a53781e81e4fa4a098787a7af01773.r2.dev";
  baconDBLoadPromise = Promise.all([
    fetch(`${DB_BASE}/bacon-db.json`).then(r => r.ok ? r.json() : {}),
    fetch(`${DB_BASE}/movie-index.json`).then(r => r.ok ? r.json() : {}),
  ])
    .then(([baconData, movieData]) => {
      BACON_DB = baconData;
      // movie-index.json stores movie title (lowercase) → [actor names (lowercase)]
      // Convert arrays to Sets for fast lookup
      MOVIE_INDEX = {};
      for (const [title, cast] of Object.entries(movieData)) {
        MOVIE_INDEX[title] = new Set(cast);
      }
      console.log(`Loaded Bacon DB: ${Object.keys(BACON_DB).length.toLocaleString()} actors, ${Object.keys(MOVIE_INDEX).length.toLocaleString()} movies indexed`);
      window._BACON_DB = BACON_DB;
      window._MOVIE_INDEX = MOVIE_INDEX;
      return BACON_DB;
    })
    .catch(err => {
      console.warn("Could not load database files:", err.message);
      BACON_DB = {}; MOVIE_INDEX = {};
      return {};
    });
  return baconDBLoadPromise;
}

function dbEntry(name) {
  if (!BACON_DB || !name) return null;
  return BACON_DB[name.toLowerCase().trim()] || null;
}

function dbVerifyConnection(actorA, actorB, movie) {
  const norm = s => s.toLowerCase().trim();
  const aNorm = norm(actorA);
  const bNorm = norm(actorB);
  const mNorm = norm(movie);

  // Strategy 1: exact match
  const cast = MOVIE_INDEX[mNorm];
  if (cast && cast.has(aNorm) && cast.has(bNorm)) {
    return { valid:true, reason:"Verified from local database." };
  }

  // Strategy 2: title with year — match "Zombieland" against "Zombieland (2009)"
  // Also handles user typing "Zombieland (2009)" matching key "zombieland (2009)"
  const matchingKeys = Object.keys(MOVIE_INDEX).filter(key => {
    // Strip year from both and compare base titles
    const baseKey   = key.replace(/\s*\(\d{4}\)\s*$/, "").trim();
    const baseQuery = mNorm.replace(/\s*\(\d{4}\)\s*$/, "").trim();
    if (baseKey !== baseQuery) return false;
    // If user typed a year, make sure it matches
    const yearQuery = mNorm.match(/\((\d{4})\)/);
    const yearKey   = key.match(/\((\d{4})\)/);
    if (yearQuery && yearKey) return yearQuery[1] === yearKey[1];
    return true;
  });

  for (const key of matchingKeys) {
    const titleCast = MOVIE_INDEX[key];
    if (titleCast && titleCast.has(aNorm) && titleCast.has(bNorm)) {
      return { valid:true, reason:"Verified from local database." };
    }
  }

  // Strategy 3: partial title match (handles "Ocean's 11" vs "Ocean's Eleven" etc)
  for (const [title, titleCast] of Object.entries(MOVIE_INDEX)) {
    const baseTitle = title.replace(/\s*\(\d{4}\)\s*$/, "").trim();
    const longer  = baseTitle.length > mNorm.length ? baseTitle : mNorm;
    const shorter = baseTitle.length > mNorm.length ? mNorm : baseTitle;
    if (shorter.length >= 6 && longer.includes(shorter)) {
      if (titleCast.has(aNorm) && titleCast.has(bNorm)) {
        return { valid:true, reason:"Verified from local database." };
      }
    }
  }

  // Strategy 3: check stored Bacon paths as a fallback
  const entryB = dbEntry(actorB);
  if (entryB) {
    for (const step of entryB.path) {
      const mMatch = norm(step.movie).includes(mNorm.slice(0,10)) || mNorm.includes(norm(step.movie).slice(0,10));
      if (mMatch && norm(step.from) === aNorm) return { valid:true, reason:"Verified from local database." };
    }
  }
  const entryA = dbEntry(actorA);
  if (entryA) {
    for (const step of entryA.path) {
      const mMatch = norm(step.movie).includes(mNorm.slice(0,10)) || mNorm.includes(norm(step.movie).slice(0,10));
      if (mMatch && norm(step.to) === bNorm) return { valid:true, reason:"Verified from local database." };
    }
  }

  return null;
}

function dbGetBaconPath(actorName) {
  const e = dbEntry(actorName);
  if (!e) return null;
  return { degrees:e.degrees, path:e.path.map(s=>`${s.from} → "${s.movie}" → ${s.to}`) };
}

// No AI API — all verification is done from the local database only.

async function verifyConnection(actorA, actorB, movie) {
  // Database-only verification — no API calls
  if (!BACON_DB || Object.keys(BACON_DB).length === 0) {
    return { valid:false, reason:"Database not loaded yet. Please wait a moment and try again." };
  }
  const result = dbVerifyConnection(actorA, actorB, movie);
  if (result) return result;
  return {
    valid: false,
    reason: `Can't verify "${actorA}" → "${movie}" → "${actorB}" in the database. Check your spelling, or try a more well-known film connection.`
  };
}

async function findFasterPath(actor) {
  return dbGetBaconPath(actor);
}

async function getHint(currentActor, chain, previousHints=[]) {
  // Find a co-star of currentActor in the DB who is closer to Kevin Bacon
  if (!BACON_DB) return null;
  const entry = dbEntry(currentActor);
  if (!entry || !entry.path || entry.path.length === 0) return null;

  // The first step in the actor's own shortest path IS the hint
  const alreadyShown = new Set(previousHints.map(h => h.actor.toLowerCase()));
  for (const step of entry.path) {
    const nextActor = step.to;
    if (!alreadyShown.has(nextActor.toLowerCase())) {
      return { actor: nextActor, movie: step.movie, reason: `${nextActor} appears in ${currentActor}'s shortest path to Kevin Bacon.` };
    }
  }
  // If all path steps shown, suggest any step
  const step = entry.path[0];
  return { actor: step.to, movie: step.movie, reason: `Try connecting through ${step.movie}.` };
}



async function getLeaderboardContext(degrees, startActor) {
  // Use the DB to find the optimal path length
  const dbPath = dbGetBaconPath(startActor);
  if (!dbPath) return null;
  const optimal = dbPath.degrees;
  const diff = degrees - optimal;
  const percentile = diff === 0 ? 95 : diff === 1 ? 70 : diff === 2 ? 40 : 15;
  const comment = diff === 0
    ? "That's the optimal path — perfectly played!"
    : diff === 1
    ? "Just one step longer than optimal — great game!"
    : `The shortest path is ${optimal} degree${optimal!==1?"s":""}.`;
  return { percentile, optimal, typical: optimal + 1, comment };
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTOCOMPLETE
// ─────────────────────────────────────────────────────────────────────────────
async function searchMovies(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();

  // Search MOVIE_INDEX (477k movies) — much faster and more complete than
  // searching paths in BACON_DB
  if (MOVIE_INDEX && Object.keys(MOVIE_INDEX).length > 0) {
    const startsWith = [];
    const contains = [];
    for (const title of Object.keys(MOVIE_INDEX)) {
      if (title.startsWith(q)) startsWith.push(title);
      else if (title.includes(q)) contains.push(title);
      if (startsWith.length >= 10) break;
    }
    // Combine starts-with first, then contains, capitalise properly
    const combined = [...startsWith, ...contains];
    const seen = new Set();
    const results = [];
    for (const t of combined) {
      if (!seen.has(t)) {
        seen.add(t);
        // Restore proper capitalisation from the index key
        // (keys are lowercase, but MOVIE_INDEX values don't store the title)
        // Use title-case as best effort
        results.push(t.replace(/\w/g, c => c.toUpperCase()));
      }
      if (results.length >= 10) break;
    }
    if (results.length > 0) return results;
  }

  // Fallback: search paths in BACON_DB
  if (BACON_DB && Object.keys(BACON_DB).length > 0) {
    const seen = new Set();
    const results = [];
    for (const entry of Object.values(BACON_DB)) {
      if (!entry.path) continue;
      for (const step of entry.path) {
        const title = step.movie;
        if (!seen.has(title) && title.toLowerCase().includes(q)) {
          seen.add(title);
          results.push(title);
          if (results.length >= 10) return results;
        }
      }
    }
    return results;
  }

  return [];
}
function filterActors(q) {
  if (!q || q.length < 1) return [];
  const lq = q.toLowerCase().trim();

  // Search the loaded database first (833k actors)
  if (BACON_DB && Object.keys(BACON_DB).length > 0) {
    const results = [];
    // Prioritize names that START with the query
    const startsWith = [];
    const contains = [];
    for (const key of Object.keys(BACON_DB)) {
      const name = BACON_DB[key].name;
      const lname = name.toLowerCase();
      if (lname.startsWith(lq)) startsWith.push(name);
      else if (lname.includes(lq)) contains.push(name);
      if (startsWith.length >= 8) break;
    }
    // Combine: starts-with first, then contains, deduplicated
    const combined = [...startsWith, ...contains];
    const seen = new Set();
    for (const name of combined) {
      if (!seen.has(name)) { seen.add(name); results.push(name); }
      if (results.length >= 10) break;
    }
    if (results.length > 0) return results;
  }

  // Fallback to hardcoded list if DB not loaded yet
  return ALL_ACTORS.filter(a => a.toLowerCase().includes(lq)).slice(0, 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTOR PHOTO
// ─────────────────────────────────────────────────────────────────────────────
const WIKI_TITLES = {
  "Edward G. Robinson":"Edward_G._Robinson","Elisha Cook Jr.":"Elisha_Cook_Jr.",
  "M. Emmet Walsh":"M._Emmet_Walsh","L.Q. Jones":"L._Q._Jones",
  "J.K. Simmons":"J._K._Simmons","Philip Seymour Hoffman":"Philip_Seymour_Hoffman",
  "William H. Macy":"William_H._Macy","Robert Downey Jr.":"Robert_Downey_Jr.",
  "Samuel L. Jackson":"Samuel_L._Jackson","Helena Bonham Carter":"Helena_Bonham_Carter",
  "Michael B. Jordan":"Michael_B._Jordan",
};
function getWikiTitle(name){ return WIKI_TITLES[name]||name.replace(/ /g,"_"); }

function ActorPhoto({name,size=110,isKevinBacon=false}) {
  const [imgUrl,setImgUrl]=useState(null);
  const [failed,setFailed]=useState(false);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if(!name) return;
    setImgUrl(null);setFailed(false);setLoading(true);
    const title=getWikiTitle(name);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then(r=>r.json())
      .then(data=>{
        const src=data?.thumbnail?.source||data?.originalimage?.source;
        if(src) setImgUrl(src); else setFailed(true);
        setLoading(false);
      })
      .catch(()=>{setFailed(true);setLoading(false);});
  },[name]);
  const borderColor=isKevinBacon?"#d4a017":"rgba(212,160,23,0.4)";
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",
      border:`3px solid ${borderColor}`,background:"rgba(255,255,255,0.07)",
      display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
      boxShadow:isKevinBacon?"0 0 20px rgba(212,160,23,0.4)":"none"}}>
      {imgUrl&&!failed
        ? <img src={imgUrl} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center"}} onError={()=>setFailed(true)}/>
        : <span style={{fontSize:size*0.32+"px",userSelect:"none"}}>{loading?"⏳":isKevinBacon?"🥓":"🎭"}</span>}
    </div>
  );
}

// MoviePoster — shows a film emoji (no external API needed)
function MoviePoster({title,size=48}) {
  return <span style={{fontSize:size*0.5+"px"}}>🎬</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function FilmStrip({count}) {
  return (
    <div className="film-strip">
      {[1,2,3,4,5,6].map(i=>(
        <div key={i} className={`degree-dot ${i<=count?"filled":""}`}>{i}</div>
      ))}
    </div>
  );
}

function ChainStep({from,movie,to}) {
  return (
    <div className="chain-step">
      <ActorPhoto name={from} size={26}/>
      <span className="chain-actor">{from}</span>
      <span className="chain-arrow">▸</span>
      <span className="chain-movie-wrap">
        <MoviePoster title={movie} size={28}/>
        <span className="chain-movie">"{movie}"</span>
      </span>
      <span className="chain-arrow">▸</span>
      <span className="chain-actor">{to}</span>
      <ActorPhoto name={to} size={26}/>
    </div>
  );
}

function ActorCard({name,isKevinBacon=false}) {
  return (
    <div className={`actor-card ${isKevinBacon?"bacon-card":""}`}>
      <ActorPhoto name={name} size={110} isKevinBacon={isKevinBacon}/>
      <div className="actor-name">{name}</div>
      {isKevinBacon&&<div className="bacon-label">KEVIN BACON</div>}
    </div>
  );
}

function AutocompleteInput({label,placeholder,value,onChange,onSelect,disabled,inputRef,type="actor",onKeyDown:parentKD}) {
  const [sugg,setSugg]=useState([]);
  const [open,setOpen]=useState(false);
  const [hi,setHi]=useState(-1);
  const [loading,setLoading]=useState(false);
  const debRef=useRef(null);
  const wrapRef=useRef(null);
  useEffect(()=>{
    if(!value||value.length<2){setSugg([]);setOpen(false);return;}
    clearTimeout(debRef.current);
    debRef.current=setTimeout(async()=>{
      if(type==="movie"){setLoading(true);const r=await searchMovies(value);setLoading(false);setSugg(r);setOpen(r.length>0);}
      else{const r=filterActors(value);setSugg(r);setOpen(r.length>0);}
      setHi(-1);
    },type==="movie"?350:80);
  },[value,type]);
  useEffect(()=>{
    const h=e=>{if(wrapRef.current&&!wrapRef.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  function pick(item){onSelect(item);setSugg([]);setOpen(false);setHi(-1);}
  function handleKD(e){
    if(open&&sugg.length>0){
      if(e.key==="ArrowDown"){e.preventDefault();setHi(h=>Math.min(h+1,sugg.length-1));return;}
      if(e.key==="ArrowUp"){e.preventDefault();setHi(h=>Math.max(h-1,-1));return;}
      if(e.key==="Enter"&&hi>=0){e.preventDefault();pick(sugg[hi]);return;}
      if(e.key==="Escape"){setOpen(false);return;}
    }
    parentKD?.(e);
  }
  return (
    <div className="autocomplete-wrap" ref={wrapRef}>
      <label className="input-label">{label}</label>
      <div style={{position:"relative"}}>
        <input ref={inputRef} className="text-input" placeholder={placeholder} value={value}
          onChange={e=>onChange(e.target.value)} onKeyDown={handleKD}
          onFocus={()=>{if(sugg.length>0)setOpen(true);}}
          disabled={disabled} autoComplete="off"/>
        {loading&&<span className="ac-spinner">⏳</span>}
      </div>
      {open&&sugg.length>0&&(
        <ul className="ac-dropdown">
          {sugg.map((s,i)=>(
            <li key={`${s}-${i}`} className={`ac-item${i===hi?" ac-highlighted":""}`}
              onMouseDown={()=>pick(s)} onMouseEnter={()=>setHi(i)}>
              {type==="movie"?"🎬":"🎭"} {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────────────────────
function Overlay({children,onClose}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e=>e.stopPropagation()}>{children}</div>
    </div>
  );
}

function HowToPlay({onClose}) {
  const steps=[
    {icon:"🎲",text:"Pick a difficulty (or play the Daily/Weekly Challenge) to get a starting actor."},
    {icon:"🎬",text:"Name any actor who appeared in a film with the current actor, and name that film."},
    {icon:"✅",text:"The app verifies your answer against real movie databases — no cheating!"},
    {icon:"🔗",text:"Keep chaining actors until you reach Kevin Bacon in 6 steps or fewer."},
    {icon:"💡",text:"Stuck? Use a hint (3 per game). Each one suggests a different path. Undo reverts your last step."},
    {icon:"⏱️",text:"Timed Mode: you have 90 seconds per step. Wrong answers cost 15 seconds!"},
    {icon:"🔄",text:"Reverse Mode: start FROM Kevin Bacon and work outward to the target actor."},
    {icon:"👥",text:"2-Player Mode: Player 1 picks the actor, Player 2 races to connect them."},
    {icon:"🏆",text:"Win streaks, unlock 15 achievements, and share your result card!"},
  ];
  return (
    <Overlay onClose={onClose}>
      <h2 className="modal-title">How to Play</h2>
      <div className="how-steps">
        {steps.map((s,i)=>(
          <div key={i} className="how-step">
            <span className="how-icon">{s.icon}</span>
            <span className="how-text">{s.text}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:8,padding:"12px",background:"rgba(212,160,23,0.08)",borderRadius:10,fontSize:"0.8rem",lineHeight:1.6}}>
        💡 <strong style={{color:"#d4a017"}}>Pro tip:</strong> Kevin Bacon has appeared in 80+ films across 5 decades. Nearly every Hollywood actor connects in 2–3 degrees!
      </div>
      <button className="btn-primary" style={{width:"100%",marginTop:16}} onClick={onClose}>Let's Play!</button>
    </Overlay>
  );
}

function SettingsModal({settings,onChange,onClose}) {
  return (
    <Overlay onClose={onClose}>
      <h2 className="modal-title">⚙️ Settings</h2>
      {[{key:"sound",label:"🔊 Sound effects"},{key:"haptics",label:"📳 Haptics"}].map(({key,label})=>(
        <div key={key} className="settings-row">
          <span className="settings-label">{label}</span>
          <button className={`toggle-btn ${settings[key]?"on":"off"}`} onClick={()=>onChange(key,!settings[key])}>
            {settings[key]?"ON":"OFF"}
          </button>
        </div>
      ))}
      <div className="settings-row">
        <span className="settings-label">🌗 Theme</span>
        <button className="toggle-btn on" onClick={()=>onChange("theme",settings.theme==="dark"?"light":"dark")}>
          {settings.theme==="dark"?"DARK":"LIGHT"}
        </button>
      </div>
      <button className="btn-secondary" style={{width:"100%",marginTop:16}} onClick={onClose}>Done</button>
    </Overlay>
  );
}

function StatsModal({stats,onClose}) {
  const winRate=stats.wins+stats.losses>0?Math.round(stats.wins/(stats.wins+stats.losses)*100):0;
  const avgDeg=stats.wins>0?(stats.totalDegrees/stats.wins).toFixed(1):"—";
  const earned=ACHIEVEMENTS.filter(a=>stats.achievements.includes(a.id));
  return (
    <Overlay onClose={onClose}>
      <h2 className="modal-title">📊 Stats & Achievements</h2>
      <div className="stats-grid">
        {[{l:"Wins",v:stats.wins},{l:"Losses",v:stats.losses},{l:"Win Rate",v:winRate+"%"},
          {l:"Streak",v:stats.streak},{l:"Best Streak",v:stats.bestStreak},{l:"Avg Degrees",v:avgDeg},
          {l:"Best",v:stats.bestDegrees===999?"—":stats.bestDegrees+" deg"},{l:"Total",v:stats.wins+stats.losses}
        ].map(({l,v})=>(
          <div key={l} className="stat-box"><div className="stat-val">{v}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>
      <div className="ach-section">
        <div className="ach-title">Achievements ({earned.length}/{ACHIEVEMENTS.length})</div>
        <div className="ach-grid">
          {ACHIEVEMENTS.map(a=>{
            const got=stats.achievements.includes(a.id);
            return (
              <div key={a.id} className={`ach-item ${got?"earned":"locked"}`} title={a.desc}>
                <span className="ach-icon">{got?a.icon:"🔒"}</span>
                <span className="ach-name">{a.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {stats.history.length>0&&(
        <div className="history-section">
          <div className="ach-title">Recent Games</div>
          {stats.history.slice(-6).reverse().map((h,i)=>(
            <div key={i} className={`history-row ${h.won?"hist-win":"hist-loss"}`}>
              <span>{h.won?"✅":"❌"} {h.actor}</span>
              <span>{h.won?`${h.degrees} deg`:""} {h.mode||h.diff}</span>
            </div>
          ))}
        </div>
      )}
      <button className="btn-secondary" style={{width:"100%",marginTop:16}} onClick={onClose}>Close</button>
    </Overlay>
  );
}

function AchievementToast({achievement,onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,3500);return()=>clearTimeout(t);},[]);
  return (
    <div className="ach-toast">
      <span className="ach-toast-icon">{achievement.icon}</span>
      <div>
        <div className="ach-toast-title">Achievement Unlocked!</div>
        <div className="ach-toast-name">{achievement.name}</div>
        <div className="ach-toast-desc">{achievement.desc}</div>
      </div>
    </div>
  );
}

// Visual share card rendered to canvas
function ShareModal({chain,startActor,degrees,difficulty,mode,leaderboard,onClose,onUnlockShared}) {
  const canvasRef=useRef(null);
  const [copied,setCopied]=useState(false);
  const diffEmoji={easy:"🌟",medium:"🎭",hard:"💀"}[difficulty]||"🎬";
  const modeLabel=mode==="timed"?"⏱️ Timed":mode==="reverse"?"🔄 Reverse":mode==="two_player"?"👥 2-Player":"";
  const dots=chain.map(()=>"🎬").join("")+"🥓";

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas) return;
    const ctx=canvas.getContext("2d");
    const W=420,H=280;
    canvas.width=W; canvas.height=H;
    // Background
    ctx.fillStyle="#0d0d0d";
    ctx.fillRect(0,0,W,H);
    // Gold border
    ctx.strokeStyle="#d4a017";
    ctx.lineWidth=3;
    ctx.strokeRect(6,6,W-12,H-12);
    // Title
    ctx.fillStyle="#d4a017";
    ctx.font="bold 18px serif";
    ctx.textAlign="center";
    ctx.fillText("Six Degrees of Kevin Bacon",W/2,40);
    // Subtitle
    ctx.fillStyle="#888";
    ctx.font="12px monospace";
    ctx.fillText(`${diffEmoji} ${(difficulty||"").toUpperCase()}${modeLabel?" · "+modeLabel:""}  —  ${startActor}`,W/2,65);
    // Dots
    ctx.font="28px serif";
    ctx.fillText(dots,W/2,110);
    // Degrees
    ctx.fillStyle="#f0e6d3";
    ctx.font="bold 36px serif";
    ctx.fillText(`${degrees} Degree${degrees!==1?"s":""}`,W/2,158);
    // Leaderboard context
    if(leaderboard){
      ctx.fillStyle="#d4a017";
      ctx.font="13px monospace";
      ctx.fillText(`Better than ${leaderboard.percentile}% of players · Optimal: ${leaderboard.optimal}`,W/2,185);
    }
    // Comment
    if(leaderboard?.comment){
      ctx.fillStyle="#888";
      ctx.font="italic 11px monospace";
      ctx.fillText(leaderboard.comment.slice(0,60),W/2,208);
    }
    // Footer
    ctx.fillStyle="#555";
    ctx.font="10px monospace";
    ctx.fillText("sixdegrees.bacon",W/2,H-20);
  },[chain,degrees,leaderboard]);

  function copyImage() {
    const canvas=canvasRef.current;
    canvas.toBlob(blob=>{
      try {
        navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);
        setCopied(true); setTimeout(()=>setCopied(false),2000);
        onUnlockShared?.();
      } catch {
        // Fallback: copy text
        const text=`Six Degrees of Kevin Bacon\n${diffEmoji} ${(difficulty||"").toUpperCase()} — ${startActor}\n${dots}\n${degrees} degree${degrees!==1?"s":""} to Kevin Bacon!`;
        navigator.clipboard.writeText(text);
        setCopied(true); setTimeout(()=>setCopied(false),2000);
        onUnlockShared?.();
      }
    });
  }

  const textFallback=`Six Degrees of Kevin Bacon\n${diffEmoji} ${(difficulty||"").toUpperCase()}${modeLabel?" · "+modeLabel:""} — ${startActor}\n${dots}\n${degrees} degree${degrees!==1?"s":""} to Kevin Bacon!${leaderboard?`\nBetter than ${leaderboard.percentile}% of players.`:""}`;

  return (
    <Overlay onClose={onClose}>
      <h2 className="modal-title">📤 Share Your Result</h2>
      <canvas ref={canvasRef} style={{width:"100%",borderRadius:8,border:"1px solid rgba(212,160,23,0.3)"}}/>
      {leaderboard&&(
        <div style={{marginTop:10,padding:"10px 14px",background:"rgba(212,160,23,0.08)",borderRadius:10,fontSize:"0.8rem",lineHeight:1.6}}>
          📊 You beat <strong style={{color:"#d4a017"}}>{leaderboard.percentile}%</strong> of players. Optimal path: <strong>{leaderboard.optimal}</strong> degrees. {leaderboard.comment}
        </div>
      )}
      <div className="action-row" style={{marginTop:14,flexWrap:"wrap"}}>
        <button className="btn-primary" onClick={copyImage}>{copied?"✅ Copied!":"🖼️ Copy Image"}</button>
        <button className="btn-secondary" onClick={()=>{navigator.clipboard.writeText(textFallback);setCopied(true);setTimeout(()=>setCopied(false),2000);onUnlockShared?.();}}>
          {copied?"✅":"📋"} Copy Text
        </button>
        <button className="btn-secondary" onClick={onClose}>Close</button>
      </div>
    </Overlay>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFETTI
// ─────────────────────────────────────────────────────────────────────────────
function Confetti() {
  const canvasRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas) return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    const pieces=Array.from({length:120},()=>({
      x:Math.random()*canvas.width, y:-20,
      r:Math.random()*6+3, c:["#d4a017","#f0e6d3","#e05555","#7eb8d4","#90c490"][Math.floor(Math.random()*5)],
      vx:(Math.random()-0.5)*4, vy:Math.random()*4+2,
      rot:Math.random()*360, rspeed:(Math.random()-0.5)*8,
    }));
    let raf;
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p=>{
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.c; ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
        ctx.restore();
        p.x+=p.vx; p.y+=p.vy; p.rot+=p.rspeed; p.vy+=0.05;
      });
      if(pieces.some(p=>p.y<canvas.height)) raf=requestAnimationFrame(draw);
    }
    draw();
    const t=setTimeout(()=>cancelAnimationFrame(raf),4000);
    return()=>{cancelAnimationFrame(raf);clearTimeout(t);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1000}}/>;
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTDOWN TIMER HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useTimer(active, initialSeconds, onExpire, soundEnabled, audioRef) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);
  const expiredRef = useRef(false);

  useEffect(()=>{
    setSeconds(initialSeconds);
    expiredRef.current=false;
  },[initialSeconds]);

  useEffect(()=>{
    if(!active){clearInterval(intervalRef.current);return;}
    intervalRef.current=setInterval(()=>{
      setSeconds(s=>{
        const next=s-1;
        if(soundEnabled&&audioRef?.current){
          if(next<=10&&next>0) audioRef.current.playTick?.();
          if(next<=5&&next>0) audioRef.current.playUrgent?.();
        }
        if(next<=0&&!expiredRef.current){ expiredRef.current=true; onExpire?.(); }
        return Math.max(0,next);
      });
    },1000);
    return()=>clearInterval(intervalRef.current);
  },[active]);

  function reset(s){ setSeconds(s||initialSeconds); expiredRef.current=false; }
  return {seconds,reset};
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // ── Load offline database once on mount ────────────────────────────────────
  const [dbReady,setDbReady]=useState(false);
  useEffect(()=>{ loadBaconDB().then(()=>setDbReady(true)); },[]);

  // ── Core game state
  const [phase,setPhase]=useState("start");
  const [startActor,setStartActor]=useState("");
  const [targetActor,setTargetActor]=useState("Kevin Bacon"); // changes in reverse mode
  const [currentActor,setCurrentActor]=useState("");
  const [chain,setChain]=useState([]);
  const [difficulty,setDifficulty]=useState("easy");
  const [gameMode,setGameMode]=useState("normal"); // normal|timed|reverse|two_player
  const [isDaily,setIsDaily]=useState(false);
  const [isWeekly,setIsWeekly]=useState(false);

  // ── Two-player state
  const [twoPlayerTurn,setTwoPlayerTurn]=useState(1); // 1 or 2
  const [player1Actor,setPlayer1Actor]=useState("");
  const [twoPlayerPhase,setTwoPlayerPhase]=useState("pick"); // pick|play|result

  // ── Timer state
  const TIMER_SECONDS=90;
  const WRONG_PENALTY=15;
  const [timerActive,setTimerActive]=useState(false);
  const audioRef=useRef(null);

  // ── Input
  const [actorInput,setActorInput]=useState("");
  const [movieInput,setMovieInput]=useState("");
  const [error,setError]=useState("");
  const [statusMsg,setStatusMsg]=useState("");
  const [shake,setShake]=useState(false);
  const [flash,setFlash]=useState("");

  // ── Hints / Undo
  const [hintsLeft,setHintsLeft]=useState(3);
  const [hintData,setHintData]=useState(null);
  const [hintLoading,setHintLoading]=useState(false);
  const [previousHints,setPreviousHints]=useState([]);
  const [undoStack,setUndoStack]=useState([]);
  const [usedHint,setUsedHint]=useState(false);

  // ── Post-game
  const [fasterPath,setFasterPath]=useState(null);
  const [fasterDegrees,setFasterDegrees]=useState(null);
  const [showFasterPath,setShowFasterPath]=useState(false);
  const [leaderboard,setLeaderboard]=useState(null);
  const [showConfetti,setShowConfetti]=useState(false);

  // ── Modals
  const [showHow,setShowHow]=useState(false);
  const [showSettings,setShowSettings]=useState(false);
  const [showStats,setShowStats]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const [showModeSelect,setShowModeSelect]=useState(false);
  const [pendingDiff,setPendingDiff]=useState(null);

  // ── Persistent
  const [stats,setStatsState]=useState(loadStats);
  const [newAch,setNewAch]=useState(null);
  const [achQueue,setAchQueue]=useState([]);

  const _audio=useAudio();
  audioRef.current=_audio;
  const actorRef=useRef();
  const settings=stats.settings;

  // Timer with sound
  const {seconds:timerSeconds, reset:resetTimer}=useTimer(
    timerActive&&phase==="playing",
    TIMER_SECONDS,
    ()=>handleTimerExpire(),
    settings.sound,
    audioRef
  );

  function vibrate(p){if(settings.haptics&&navigator.vibrate)navigator.vibrate(p);}
  const audio={
    playError:()=>{if(settings.sound)_audio.playError();vibrate([80,30,80]);},
    playLose: ()=>{if(settings.sound)_audio.playLose(); vibrate([200,100,200,100,200]);},
    playCheer:()=>{if(settings.sound)_audio.playCheer();vibrate([50,50,50,50,150]);},
    playClick:()=>{if(settings.sound)_audio.playClick();vibrate(30);},
    playHint: ()=>{if(settings.sound)_audio.playHint(); vibrate([40,40,40]);},
  };

  function updateStats(updater){
    setStatsState(prev=>{const next={...prev,...updater(prev)};saveStats(next);return next;});
  }
  function setSetting(key,val){updateStats(s=>({settings:{...s.settings,[key]:val}}));}

  function unlockAch(id){
    if(stats.achievements.includes(id)) return;
    updateStats(s=>({achievements:[...s.achievements,id]}));
    const ach=ACHIEVEMENTS.find(a=>a.id===id);
    if(ach) setAchQueue(q=>[...q,ach]);
  }

  // Show achievement toasts one at a time
  useEffect(()=>{
    if(achQueue.length>0&&!newAch){
      setNewAch(achQueue[0]);
      setAchQueue(q=>q.slice(1));
    }
  },[achQueue,newAch]);

  function checkAchievements(won,deg,diff,hintUsed,newStreak,mode){
    if(won){
      unlockAch("first_win");
      if(deg<=2) unlockAch("speed2");
      if(deg<=3) unlockAch("speed3");
      if(!hintUsed) unlockAch("perfect");
      if(diff==="hard") unlockAch("hard_win");
      if(diff==="hard"&&!hintUsed) unlockAch("no_hint_hard");
      if(newStreak>=3) unlockAch("streak3");
      if(newStreak>=5) unlockAch("streak5");
      if(isDaily) unlockAch("daily");
      if(isWeekly) unlockAch("weekly");
      if(mode==="timed") unlockAch("speed_mode");
      if(mode==="reverse") unlockAch("reverse");
      if(mode==="two_player") unlockAch("two_player");
    }
  }

  function pickRandomActor(diff){
    const pool=ACTOR_POOLS[diff||difficulty];
    return pool[Math.floor(Math.random()*pool.length)];
  }

  // Save/restore game
  function saveCurrentGame(){
    if(phase!=="playing") return;
    updateStats(s=>({savedGame:{startActor,currentActor,chain,difficulty,gameMode,hintsLeft,usedHint,undoStack}}));
  }
  useEffect(()=>{
    if(phase==="playing") saveCurrentGame();
  },[chain,currentActor]);

  function startGame(actor, diff, mode="normal", daily=false, weekly=false){
    const d=diff||difficulty;
    setDifficulty(d);
    setGameMode(mode);
    const a=actor||pickRandomActor(d);
    const target=mode==="reverse"?a:"Kevin Bacon";
    const startFrom=mode==="reverse"?"Kevin Bacon":a;
    setStartActor(a); setCurrentActor(startFrom); setTargetActor(target);
    setChain([]); setUndoStack([]);
    setMovieInput(""); setActorInput("");
    setError(""); setStatusMsg("");
    setFasterPath(null); setFasterDegrees(null); setShowFasterPath(false);
    setHintData(null); setPreviousHints([]); setHintsLeft(3); setUsedHint(false);
    setLeaderboard(null); setShowConfetti(false);
    setIsDaily(daily); setIsWeekly(weekly);
    if(mode==="timed"){resetTimer(TIMER_SECONDS);setTimerActive(true);}
    else setTimerActive(false);
    updateStats(s=>({savedGame:null}));
    setPhase("playing");
    setTimeout(()=>actorRef.current?.focus(),100);
  }

  function resumeSavedGame(){
    const g=stats.savedGame;
    if(!g) return;
    setStartActor(g.startActor); setCurrentActor(g.currentActor);
    setChain(g.chain); setDifficulty(g.difficulty);
    setGameMode(g.gameMode||"normal");
    setHintsLeft(g.hintsLeft??3); setUsedHint(g.usedHint||false);
    setUndoStack(g.undoStack||[]);
    setTargetActor("Kevin Bacon"); setTimerActive(false);
    setError(""); setStatusMsg("");
    setPhase("playing");
    updateStats(s=>({savedGame:null}));
    setTimeout(()=>actorRef.current?.focus(),100);
  }

  function startDaily(diff){
    const d=diff||difficulty;
    const actor=getDailyActor(d);
    startGame(actor,d,"normal",true,false);
    const today=new Date().toDateString();
    updateStats(s=>({dailyPlayed:{...s.dailyPlayed,[today+d]:true}}));
  }
  function startWeekly(){
    const theme=getWeeklyTheme();
    const actor=theme.actors[Math.floor(Math.random()*theme.actors.length)];
    startGame(actor,difficulty,"normal",false,true);
    const week=Math.floor(Date.now()/(86400000*7));
    updateStats(s=>({weeklyPlayed:{...s.weeklyPlayed,[week]:true}}));
  }
  function isDailyPlayed(diff){const t=new Date().toDateString();return !!stats.dailyPlayed?.[t+(diff||difficulty)];}
  function isWeeklyPlayed(){const w=Math.floor(Date.now()/(86400000*7));return !!stats.weeklyPlayed?.[w];}

  function triggerShake(){setShake(true);setTimeout(()=>setShake(false),500);}
  function triggerFlash(t){setFlash(t);setTimeout(()=>setFlash(""),800);}

  function handleTimerExpire(){
    setTimerActive(false);
    triggerFlash("lose"); audio.playLose();
    updateStats(s=>({losses:s.losses+1,streak:0,history:[...s.history,{actor:startActor,degrees:chain.length,diff:difficulty,won:false,mode:"timed"}]}));
    setPhase("lost");
    setStatusMsg("⏱️ Time's up!");
  }

  async function handleHint(){
    if(hintsLeft<=0||hintLoading) return;
    setHintLoading(true); setHintData(null);
    const h=await getHint(currentActor,chain,previousHints);
    setHintLoading(false);
    if(h){
      setHintData(h); setPreviousHints(prev=>[...prev,h]);
      setHintsLeft(n=>n-1); setUsedHint(true); audio.playHint();
    } else { setError("Couldn't fetch a hint. Try again."); }
  }

  function handleUndo(){
    if(undoStack.length===0) return;
    const prev=undoStack[undoStack.length-1];
    setChain(prev.chain); setCurrentActor(prev.currentActor);
    setUndoStack(u=>u.slice(0,-1));
    setHintData(null); setPreviousHints([]); setError(""); setStatusMsg("");
    audio.playClick();
    if(gameMode==="timed") resetTimer(TIMER_SECONDS);
  }

  async function handleSubmit(){
    const movie=movieInput.trim(), actor=actorInput.trim();
    if(!movie||!actor){setError("Fill in both the actor and the movie.");triggerShake();audio.playError();return;}

    if(gameMode==="timed") setTimerActive(false); // pause during verify
    setPhase("verifying"); setError("");
    setStatusMsg(`🔍 Verifying "${currentActor}" → "${movie}" → "${actor}"…`);

    const result=await verifyConnection(currentActor,actor,movie);

    if(!result.valid){
      setPhase("playing");
      setStatusMsg("");
      setError(`✗ ${result.reason}`);
      triggerShake(); triggerFlash("error"); audio.playError();
      if(gameMode==="timed"){
        // Penalty: subtract 15s
        resetTimer(Math.max(5,timerSeconds-WRONG_PENALTY));
        setTimerActive(true);
        setStatusMsg(`⏱️ -${WRONG_PENALTY}s penalty!`);
        setTimeout(()=>setStatusMsg(""),2000);
      }
      setTimeout(()=>actorRef.current?.focus(),100);
      return;
    }

    setUndoStack(u=>[...u,{chain:[...chain],currentActor}]);
    const newChain=[...chain,{from:currentActor,movie,to:actor}];
    setChain(newChain); setMovieInput(""); setActorInput("");
    setHintData(null); setPreviousHints([]); audio.playClick();

    const isTarget=actor.toLowerCase().replace(/\s/g,"")===(targetActor.toLowerCase().replace(/\s/g,""));
    const deg=newChain.length;

    if(isTarget){
      setTimerActive(false);
      triggerFlash("win"); audio.playCheer();
      setShowConfetti(true); setTimeout(()=>setShowConfetti(false),4500);
      const newStreak=stats.streak+1;
      const newBest=Math.min(stats.bestDegrees,deg);
      updateStats(s=>({
        wins:s.wins+1, streak:newStreak, bestStreak:Math.max(s.bestStreak,newStreak),
        totalDegrees:s.totalDegrees+deg, bestDegrees:newBest,
        history:[...s.history,{actor:startActor,degrees:deg,diff:difficulty,won:true,mode:gameMode}],
      }));
      checkAchievements(true,deg,difficulty,usedHint,newStreak,gameMode);
      if(stats.wins+1>=10) unlockAch("ten_wins");
      setPhase("checking");
      setStatusMsg("🏆 Connected! Calculating your score…");
      const [fp,lb]=await Promise.all([
        findFasterPath(gameMode==="reverse"?targetActor:startActor),
        getLeaderboardContext(deg,gameMode==="reverse"?targetActor:startActor),
      ]);
      setFasterPath(fp?.path||null); setFasterDegrees(fp?.degrees??null);
      setLeaderboard(lb||null);
      setPhase("won"); setStatusMsg("");
    } else if(deg>=6){
      setTimerActive(false);
      triggerFlash("lose"); audio.playLose();
      updateStats(s=>({losses:s.losses+1,streak:0,history:[...s.history,{actor:startActor,degrees:deg,diff:difficulty,won:false,mode:gameMode}]}));
      setPhase("lost");
    } else {
      setCurrentActor(actor); setPreviousHints([]);
      if(gameMode==="timed"){resetTimer(TIMER_SECONDS);setTimerActive(true);}
      setPhase("playing");
      setStatusMsg(deg===5?`⚠️ Last step — must reach ${targetActor}!`:"");
    }
  }

  function handleKeyDown(e){if(e.key==="Enter")handleSubmit();}
  const degrees=chain.length;
  const theme=settings.theme||"dark";
  const dark=theme!=="light";
  const gold="#d4a017";

  // Weekly theme info
  const weeklyTheme=getWeeklyTheme();

  // ───────────────────────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div className={`app app-${theme} ${flash}`}>
      <style>{buildCSS(theme)}</style>

      {showConfetti&&<Confetti/>}

      {newAch&&<AchievementToast achievement={newAch} onDone={()=>setNewAch(null)}/>}

      {showHow&&<HowToPlay onClose={()=>setShowHow(false)}/>}
      {showSettings&&<SettingsModal settings={settings} onChange={setSetting} onClose={()=>setShowSettings(false)}/>}
      {showStats&&<StatsModal stats={stats} onClose={()=>setShowStats(false)}/>}
      {showShare&&<ShareModal chain={chain} startActor={startActor} degrees={degrees}
        difficulty={difficulty} mode={gameMode} leaderboard={leaderboard}
        onUnlockShared={()=>unlockAch("shared")}
        onClose={()=>setShowShare(false)}/>}

      {/* Mode Select Modal */}
      {showModeSelect&&(
        <Overlay onClose={()=>setShowModeSelect(false)}>
          <h2 className="modal-title">Choose Mode</h2>
          <p style={{fontSize:"0.82rem",color:"#888",marginBottom:16}}>Starting actor: <strong style={{color:gold}}>{pendingDiff&&pickRandomActor(pendingDiff)}</strong></p>
          {[
            {mode:"normal",icon:"🎬",name:"Classic",desc:"Connect the actor to Kevin Bacon in 6 steps."},
            {mode:"timed", icon:"⏱️",name:"Timed",  desc:"90 seconds per step. Wrong answers cost 15s."},
            {mode:"reverse",icon:"🔄",name:"Reverse",desc:"Start FROM Kevin Bacon, work outward."},
            {mode:"two_player",icon:"👥",name:"2-Player",desc:"Player 1 picks the actor, Player 2 solves."},
          ].map(({mode,icon,name,desc})=>(
            <button key={mode} className="mode-btn" onClick={()=>{setShowModeSelect(false);startGame(null,pendingDiff,mode);}}>
              <span className="mode-icon">{icon}</span>
              <span className="mode-name">{name}</span>
              <span className="mode-desc">{desc}</span>
            </button>
          ))}
        </Overlay>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-icons left">
          <button className="icon-btn" onClick={()=>setShowHow(true)} title="How to Play">❓</button>
          <button className="icon-btn" onClick={()=>setShowStats(true)} title="Stats">📊</button>
        </div>
        <div className="header-center">
          <div className="logo-strip">🎬🥓🎬🥓🎬🥓🎬</div>
          <h1 className="title">Six Degrees of<br/><span className="bacon">Kevin Bacon</span></h1>
          <div className="logo-strip">🥓🎬🥓🎬🥓🎬🥓</div>
        </div>
        <div className="header-icons right">
          <button className="icon-btn" onClick={()=>setShowSettings(true)} title="Settings">⚙️</button>
        </div>
      </header>

      {/* ── START SCREEN ── */}
      {phase==="start"&&(
        <div className="center-panel">
          <p className="intro">Connect any actor to <strong>Kevin Bacon</strong> in 6 steps or fewer.</p>

          {stats.streak>0&&<div className="streak-banner">🔥 {stats.streak}-game win streak!</div>}

          {/* Resume saved game */}
          {stats.savedGame&&(
            <button className="resume-btn" onClick={resumeSavedGame}>
              ▶ Resume: {stats.savedGame.startActor} ({stats.savedGame.chain.length} steps in)
            </button>
          )}

          {/* Daily / Weekly */}
          <div className="special-row">
            <div className="special-card">
              <div className="special-label">📅 Daily Challenge</div>
              <div className="special-desc">Same actor for everyone today</div>
              <div className="special-btns">
                {["easy","medium","hard"].map(d=>(
                  <button key={d} className={`special-btn ${isDailyPlayed(d)?"done":""}`}
                    onClick={()=>!isDailyPlayed(d)&&startDaily(d)}>
                    {{easy:"🌟",medium:"🎭",hard:"💀"}[d]} {isDailyPlayed(d)?"✅":"Play"}
                  </button>
                ))}
              </div>
            </div>
            <div className="special-card">
              <div className="special-label">📆 This Week</div>
              <div className="special-desc">{weeklyTheme.name}</div>
              <button className={`special-btn-full ${isWeeklyPlayed()?"done":""}`}
                onClick={()=>!isWeeklyPlayed()&&startWeekly()}>
                {isWeeklyPlayed()?"✅ Completed":"🎬 Play Weekly"}
              </button>
            </div>
          </div>

          {/* Countdown to next daily */}
          <DailyCountdown/>

          <p className="diff-label">Choose your difficulty</p>
          <div className="diff-grid">
            {[
              {key:"easy",  icon:"🌟",name:"Easy",  desc:"Hollywood A-listers — Tom Hanks, George Clooney"},
              {key:"medium",icon:"🎭",name:"Medium",desc:"Prolific supporting players — Steve Buscemi, J.K. Simmons"},
              {key:"hard",  icon:"💀",name:"Hard",  desc:"Character actors & classics — Buster Keaton, Peter Lorre"},
            ].map(({key,icon,name,desc})=>(
              <button key={key} className={`diff-btn diff-${key}`}
                onClick={()=>{setPendingDiff(key);setShowModeSelect(true);}}>
                <span className="diff-icon">{icon}</span>
                <span className="diff-name">{name}</span>
                <span className="diff-desc">{desc}</span>
              </button>
            ))}
          </div>
          <button className="btn-ghost how-link" onClick={()=>setShowHow(true)}>❓ How to play</button>
        </div>
      )}

      {/* ── TWO PLAYER PICK ── */}
      {phase==="two_player_pick"&&(
        <div className="center-panel">
          <div className="mode-header">👥 2-Player Mode</div>
          <p className="intro">Player 1: Choose an actor for Player 2 to connect to Kevin Bacon.</p>
          <AutocompleteInput label="Actor for Player 2 to solve"
            placeholder='e.g. "Meryl Streep"'
            value={player1Actor} onChange={setPlayer1Actor} onSelect={setPlayer1Actor}
            type="actor"/>
          <button className="btn-primary" style={{width:"100%"}} onClick={()=>{
            if(!player1Actor.trim()) return;
            startGame(player1Actor.trim(),difficulty,"two_player");
            setPlayer1Actor("");
          }}>Hand to Player 2 →</button>
          <button className="btn-ghost" onClick={()=>setPhase("start")}>← Back</button>
        </div>
      )}

      {/* ── GAME SCREEN ── */}
      {(phase==="playing"||phase==="verifying")&&(
        <div className="game-panel">
          <div className="game-top-row">
            <FilmStrip count={degrees}/>
            <div className="game-badges">
              <span className={`diff-badge diff-badge-${difficulty}`}>
                {{easy:"🌟",medium:"🎭",hard:"💀"}[difficulty]} {difficulty}
              </span>
              {isDaily&&<span className="daily-badge">📅 Daily</span>}
              {isWeekly&&<span className="daily-badge">📆 Weekly</span>}
              {gameMode==="timed"&&<span className="daily-badge">⏱️ Timed</span>}
              {gameMode==="reverse"&&<span className="daily-badge">🔄 Reverse</span>}
              {gameMode==="two_player"&&<span className="daily-badge">👥 2P</span>}
            </div>
          </div>

          {/* Timer bar */}
          {gameMode==="timed"&&(
            <div className="timer-wrap">
              <div className="timer-bar" style={{width:`${(timerSeconds/TIMER_SECONDS)*100}%`,
                background:timerSeconds<=10?"#e05555":timerSeconds<=20?"#e8a020":gold}}/>
              <div className={`timer-label ${timerSeconds<=10?"timer-urgent":""}`}>{timerSeconds}s</div>
            </div>
          )}

          {/* Target reminder for reverse */}
          {gameMode==="reverse"&&(
            <div className="reverse-target">🎯 Goal: reach <strong>{targetActor}</strong></div>
          )}

          <div className="chain-log">
            {chain.map((step,i)=>(
              <ChainStep key={i} from={step.from} movie={step.movie} to={step.to}/>
            ))}
          </div>

          <ActorCard name={currentActor}/>

          {(hintData||hintLoading)&&(
            <div className="hint-box">
              {hintLoading
                ? <><span className="hint-label">💡 Thinking…</span>
                    <div className="hint-thinking-bar"><div className="hint-thinking-fill"/></div>
                    <p style={{fontSize:"0.78rem",color:"#888",fontStyle:"italic"}}>Searching for a connection…</p>
                  </>
                : <><span className="hint-label">💡 Hint</span>
                    <p><strong style={{color:gold}}>{hintData.actor}</strong> was in <em>"{hintData.movie}"</em> with {currentActor}.</p>
                    {hintData.reason&&<p style={{fontSize:"0.75rem",color:"#888",marginTop:4}}>{hintData.reason}</p>}
                  </>
              }
            </div>
          )}

          <div className={`input-section ${shake?"shake":""}`}>
            <AutocompleteInput label="Next actor" placeholder={`e.g. "${targetActor}"`}
              value={actorInput} onChange={setActorInput} onSelect={setActorInput}
              disabled={phase==="verifying"} inputRef={actorRef} type="actor" onKeyDown={handleKeyDown}/>
            <AutocompleteInput label="Movie they share together" placeholder='e.g. "Apollo 13"'
              value={movieInput} onChange={setMovieInput} onSelect={setMovieInput}
              disabled={phase==="verifying"} type="movie" onKeyDown={handleKeyDown}/>
            {error&&<div className="error-msg">{error}</div>}
            {statusMsg&&<div className="status-msg">{statusMsg}</div>}

            <button className="btn-primary" onClick={handleSubmit} disabled={phase==="verifying"} style={{width:"100%"}}>
              {phase==="verifying"?"⏳ Verifying…":"Connect →"}
            </button>

            <div className="game-tools-row">
              <button className={`tool-btn hint-btn ${hintsLeft===0?"tool-disabled":""} ${hintLoading?"hint-thinking":""}`}
                onClick={handleHint} disabled={hintsLeft===0||hintLoading||phase==="verifying"}>
                {hintLoading
                  ? <span className="hint-thinking-inner"><span className="thinking-dot"/><span className="thinking-dot"/><span className="thinking-dot"/></span>
                  : <><span>💡</span> Hint ({hintsLeft})</>}
              </button>
              <button className={`tool-btn ${undoStack.length===0?"tool-disabled":""}`}
                onClick={handleUndo} disabled={undoStack.length===0||phase==="verifying"}>
                ↩ Undo
              </button>
            </div>
          </div>

          <div className="degrees-label">{degrees} / 6 degrees used</div>
          <div className="game-escape-row">
            <button className="btn-ghost" onClick={()=>{setTimerActive(false);setPhase("start");}}>← Menu</button>
            <button className="btn-ghost" onClick={()=>{setTimerActive(false);startGame(null,difficulty,gameMode);}}>🎲 New Actor</button>
          </div>
        </div>
      )}

      {/* ── CHECKING ── */}
      {phase==="checking"&&(
        <div className="center-panel">
          <div className="spinner">🥓</div>
          <p className="status-msg">{statusMsg}</p>
        </div>
      )}

      {/* ── WON ── */}
      {phase==="won"&&(
        <div className="result-panel win-panel">
          <div className="result-emoji">🏆</div>
          <h2 className="result-title">Bacon'd!</h2>
          <p className="result-sub">
            You connected <strong>{gameMode==="reverse"?"Kevin Bacon":startActor}</strong> to{" "}
            <strong>{targetActor}</strong> in <strong>{degrees} degree{degrees!==1?"s":""}</strong>.
          </p>

          {/* Leaderboard context */}
          {leaderboard&&(
            <div className="leaderboard-box">
              <div className="lb-stat">Better than <strong style={{color:gold}}>{leaderboard.percentile}%</strong> of players</div>
              <div className="lb-stat">Optimal: <strong>{leaderboard.optimal}</strong> degrees · Typical: <strong>{leaderboard.typical}</strong></div>
              {leaderboard.comment&&<div className="lb-comment">{leaderboard.comment}</div>}
            </div>
          )}

          <div className="stats-inline">
            <div className="stat-pill">🔥 Streak: {stats.streak}</div>
            <div className="stat-pill">🏅 Best: {stats.bestDegrees===999?"—":stats.bestDegrees+" deg"}</div>
          </div>

          <div className="chain-log chain-final">
            {chain.map((s,i)=><ChainStep key={i} from={s.from} movie={s.movie} to={s.to}/>)}
          </div>

          {fasterDegrees!==null&&fasterDegrees<degrees&&(
            <div className="faster-box">
              <p>🤔 It can be done in <strong>{fasterDegrees} degree{fasterDegrees!==1?"s":""}!</strong> Think you can find it?</p>
              {!showFasterPath
                ? <button className="btn-reveal" onClick={()=>setShowFasterPath(true)}>👁 Show faster path</button>
                : fasterPath&&<div className="faster-path">{fasterPath.map((s,i)=><div key={i} className="faster-step">{s}</div>)}</div>}
            </div>
          )}
          {(fasterDegrees===null||fasterDegrees>=degrees)&&(
            <div className="faster-box optimal"><p>✨ Optimal path — you nailed it!</p></div>
          )}

          <div className="action-row" style={{flexWrap:"wrap"}}>
            <button className="btn-primary" onClick={()=>setShowShare(true)}>📤 Share</button>
            <button className="btn-secondary" onClick={()=>startGame(startActor,difficulty,gameMode)}>🔄 Retry</button>
            <button className="btn-secondary" onClick={()=>startGame(null,difficulty,gameMode)}>🎲 New Actor</button>
            <button className="btn-secondary" onClick={()=>setPhase("start")}>🏠 Menu</button>
          </div>
        </div>
      )}

      {/* ── LOST ── */}
      {phase==="lost"&&(
        <div className="result-panel lose-panel">
          <div className="result-emoji">💀</div>
          <h2 className="result-title">{statusMsg==="⏱️ Time's up!"?"Time's Up!":"Too Many Degrees!"}</h2>
          <p className="result-sub">
            {statusMsg==="⏱️ Time's up!"
              ? `You ran out of time connecting ${startActor} to Kevin Bacon.`
              : `${startActor} wasn't connected to Kevin Bacon in time. Streak resets.`}
          </p>
          <div className="chain-log chain-final">
            {chain.map((s,i)=><ChainStep key={i} from={s.from} movie={s.movie} to={s.to}/>)}
          </div>
          <div className="action-row" style={{flexWrap:"wrap"}}>
            <button className="btn-primary" onClick={()=>startGame(startActor,difficulty,gameMode)}>🔄 Try Again</button>
            <button className="btn-secondary" onClick={()=>startGame(null,difficulty,gameMode)}>🎲 New Actor</button>
            <button className="btn-secondary" onClick={()=>setPhase("start")}>🏠 Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DAILY COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────
function DailyCountdown() {
  const [timeLeft,setTimeLeft]=useState("");
  useEffect(()=>{
    function update(){
      const now=new Date();
      const midnight=new Date(now);
      midnight.setHours(24,0,0,0);
      const diff=midnight-now;
      const h=Math.floor(diff/3600000);
      const m=Math.floor((diff%3600000)/60000);
      const s=Math.floor((diff%60000)/1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }
    update();
    const t=setInterval(update,1000);
    return()=>clearInterval(t);
  },[]);
  return <div className="daily-countdown">🕐 Next daily in {timeLeft}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────
function buildCSS(theme) {
 const dark=theme!=="light";
 const bg=dark?"#0d0d0d":"#f5f0e8";
 const bg2=dark?"#1a1408":"#fff8f0";
 const bg3=dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)";
 const border=dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.12)";
 const text=dark?"#f0e6d3":"#1a1000";
 const muted=dark?"#888":"#999";
 const gold="#d4a017";
 const card=dark?"linear-gradient(135deg,#1c1408,#0d0d0d)":"linear-gradient(135deg,#fff8ec,#fff3e0)";

 return `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:${bg};color:${text};font-family:'DM Mono',monospace;min-height:100vh;}

.app{min-height:100vh;background:${dark?`radial-gradient(ellipse at top,#1a1000,${bg})`:`radial-gradient(ellipse at top,#fff3e0,${bg})`};
 display:flex;flex-direction:column;align-items:center;padding:0 16px 80px;transition:background 0.3s;}
.app.win{animation:flashWin 0.8s ease;}
.app.error{animation:flashErr 0.8s ease;}
.app.lose{animation:flashLose 0.8s ease;}
@keyframes flashWin{0%,100%{background-color:transparent;}30%{background-color:rgba(255,215,0,0.15);}}
@keyframes flashErr{0%,100%{background-color:transparent;}30%{background-color:rgba(220,50,50,0.15);}}
@keyframes flashLose{0%,100%{background-color:transparent;}30%{background-color:rgba(80,0,0,0.2);}}

.header{width:100%;max-width:540px;display:flex;align-items:flex-start;justify-content:space-between;padding:20px 0 12px;}
.header-center{text-align:center;flex:1;}
.header-icons{display:flex;gap:4px;padding-top:6px;}
.logo-strip{font-size:0.9rem;letter-spacing:4px;opacity:0.35;margin-bottom:5px;}
.title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,5vw,2.6rem);font-weight:900;line-height:1.1;color:${text};}
.bacon{color:${gold};display:block;font-style:italic;}
.icon-btn{background:transparent;border:none;font-size:1.25rem;cursor:pointer;padding:6px;border-radius:8px;transition:transform 0.2s,background 0.15s;line-height:1;}
.icon-btn:hover{transform:scale(1.15);background:${bg3};}

.ach-toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);background:${dark?"#1a1408":"#fff8ec"};
 border:2px solid ${gold};border-radius:14px;padding:12px 16px;display:flex;gap:12px;align-items:center;
 z-index:500;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:slideDown 0.3s ease;max-width:90vw;}
@keyframes slideDown{from{transform:translateX(-50%) translateY(-20px);opacity:0;}to{transform:translateX(-50%) translateY(0);opacity:1;}}
.ach-toast-icon{font-size:1.8rem;}
.ach-toast-title{font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:${gold};}
.ach-toast-name{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:${text};}
.ach-toast-desc{font-size:0.7rem;color:${muted};}

.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.72);backdrop-filter:blur(4px);z-index:300;
 display:flex;align-items:center;justify-content:center;padding:16px;}
.modal-panel{background:${bg2};border:1.5px solid ${dark?"rgba(212,160,23,0.3)":border};border-radius:20px;
 padding:24px 20px;width:100%;max-width:400px;display:flex;flex-direction:column;gap:4px;
 animation:popIn 0.2s ease;max-height:92vh;overflow-y:auto;}
@keyframes popIn{from{transform:scale(0.93);opacity:0;}to{transform:scale(1);opacity:1;}}
.modal-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:${text};margin-bottom:12px;}

.how-steps{display:flex;flex-direction:column;gap:10px;margin-bottom:8px;}
.how-step{display:flex;gap:10px;align-items:flex-start;}
.how-icon{font-size:1.2rem;flex-shrink:0;width:26px;text-align:center;}
.how-text{font-size:0.82rem;color:${dark?"#d4c9b0":text};line-height:1.6;padding-top:2px;}

.settings-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid ${border};}
.settings-label{font-size:0.88rem;color:${dark?"#d4c9b0":text};}
.toggle-btn{font-family:'DM Mono',monospace;font-size:0.7rem;font-weight:500;letter-spacing:2px;
 padding:6px 14px;border-radius:20px;border:none;cursor:pointer;transition:all 0.18s;}
.toggle-btn.on{background:${gold};color:#0d0d0d;}
.toggle-btn.off{background:${bg3};color:${muted};border:1px solid ${border};}

.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:14px;}
.stat-box{background:${bg3};border-radius:10px;padding:9px 4px;text-align:center;border:1px solid ${border};}
.stat-val{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:${gold};}
.stat-label{font-size:0.58rem;color:${muted};text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.ach-section{margin-top:8px;}
.ach-title{font-size:0.65rem;letter-spacing:2px;text-transform:uppercase;color:${muted};margin-bottom:8px;}
.ach-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;}
.ach-item{display:flex;align-items:center;gap:8px;background:${bg3};border-radius:8px;padding:7px 10px;border:1px solid ${border};}
.ach-item.earned{border-color:rgba(212,160,23,0.35);background:rgba(212,160,23,0.07);}
.ach-item.locked{opacity:0.4;}
.ach-icon{font-size:1rem;}
.ach-name{font-size:0.69rem;color:${dark?"#d4c9b0":text};line-height:1.3;}
.history-section{margin-top:12px;}
.history-row{display:flex;justify-content:space-between;font-size:0.76rem;padding:5px 8px;border-radius:6px;margin-bottom:3px;}
.hist-win{background:rgba(100,200,100,0.08);color:${dark?"#90c490":"#2a7a2a"};}
.hist-loss{background:rgba(200,80,80,0.08);color:${dark?"#e07070":"#7a2a2a"};}

.mode-btn{display:grid;grid-template-columns:2.2rem 1fr;grid-template-rows:auto auto;column-gap:10px;
 align-items:center;background:${bg3};border:1.5px solid ${border};border-radius:12px;
 padding:14px 16px;cursor:pointer;transition:all 0.18s;text-align:left;width:100%;margin-bottom:8px;}
.mode-btn:hover{border-color:${gold};background:rgba(212,160,23,0.06);transform:translateY(-1px);}
.mode-icon{grid-row:1/3;font-size:1.5rem;display:flex;align-items:center;justify-content:center;}
.mode-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:${text};line-height:1;}
.mode-desc{font-size:0.72rem;color:${muted};margin-top:2px;}
.mode-header{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:${text};text-align:center;}

.center-panel{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:480px;width:100%;margin-top:16px;}
.intro{text-align:center;font-size:0.86rem;line-height:1.7;color:${muted};}
.streak-banner{background:linear-gradient(90deg,rgba(212,160,23,0.15),rgba(212,160,23,0.25));
 border:1px solid rgba(212,160,23,0.4);border-radius:20px;padding:7px 18px;font-size:0.8rem;color:${gold};letter-spacing:1px;}
.resume-btn{width:100%;background:rgba(100,180,255,0.08);border:1.5px solid rgba(100,180,255,0.3);
 border-radius:12px;padding:12px 16px;font-family:'DM Mono',monospace;font-size:0.82rem;
 color:${dark?"#6ab4ff":"#1a60a0"};cursor:pointer;transition:all 0.18s;}
.resume-btn:hover{background:rgba(100,180,255,0.14);transform:translateY(-1px);}

.special-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;}
.special-card{background:${bg3};border:1px solid ${border};border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:8px;}
.special-label{font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:${gold};}
.special-desc{font-size:0.75rem;color:${muted};line-height:1.4;}
.special-btns{display:flex;gap:4px;}
.special-btn{flex:1;background:${bg3};border:1px solid ${border};border-radius:8px;padding:6px 4px;
 font-family:'DM Mono',monospace;font-size:0.68rem;cursor:pointer;transition:all 0.18s;color:${dark?"#d4c9b0":text};}
.special-btn:hover:not(.done){background:rgba(212,160,23,0.1);border-color:${gold};}
.special-btn.done{opacity:0.5;cursor:default;}
.special-btn-full{width:100%;background:${bg3};border:1.5px solid ${gold};border-radius:8px;padding:8px;
 font-family:'DM Mono',monospace;font-size:0.75rem;cursor:pointer;transition:all 0.18s;color:${gold};}
.special-btn-full:hover:not(.done){background:rgba(212,160,23,0.1);}
.special-btn-full.done{opacity:0.5;cursor:default;}
.daily-countdown{font-size:0.7rem;color:${muted};letter-spacing:1px;}

.diff-label{font-size:0.67rem;letter-spacing:3px;text-transform:uppercase;color:${muted};}
.diff-grid{display:flex;flex-direction:column;gap:8px;width:100%;}
.diff-btn{display:grid;grid-template-columns:2rem 1fr;grid-template-rows:auto auto;column-gap:10px;
 align-items:center;background:${bg3};border:1.5px solid ${border};border-radius:14px;
 padding:14px 16px;cursor:pointer;transition:all 0.18s;text-align:left;width:100%;}
.diff-btn:hover{transform:translateY(-2px);}
.diff-easy:hover{border-color:${gold};box-shadow:0 4px 20px rgba(212,160,23,0.2);}
.diff-medium:hover{border-color:#7eb8d4;box-shadow:0 4px 20px rgba(126,184,212,0.2);}
.diff-hard:hover{border-color:#c0392b;box-shadow:0 4px 20px rgba(192,57,43,0.2);}
.diff-icon{grid-row:1/3;font-size:1.5rem;display:flex;align-items:center;justify-content:center;}
.diff-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;line-height:1;}
.diff-easy .diff-name{color:${gold};}
.diff-medium .diff-name{color:#7eb8d4;}
.diff-hard .diff-name{color:#c0392b;}
.diff-desc{font-size:0.71rem;color:${muted};line-height:1.4;margin-top:2px;}
.how-link{font-size:0.78rem;}

.game-panel{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:540px;width:100%;margin-top:12px;}
.game-top-row{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}
.game-badges{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;}
.diff-badge{font-size:0.62rem;letter-spacing:2px;text-transform:uppercase;padding:3px 9px;border-radius:20px;font-weight:500;}
.diff-badge-easy{background:rgba(212,160,23,0.15);color:${gold};border:1px solid rgba(212,160,23,0.3);}
.diff-badge-medium{background:rgba(126,184,212,0.12);color:#7eb8d4;border:1px solid rgba(126,184,212,0.3);}
.diff-badge-hard{background:rgba(192,57,43,0.15);color:#e05555;border:1px solid rgba(192,57,43,0.3);}
.daily-badge{font-size:0.62rem;letter-spacing:2px;text-transform:uppercase;padding:3px 9px;border-radius:20px;
 background:rgba(100,180,255,0.12);color:#6ab4ff;border:1px solid rgba(100,180,255,0.3);}

.timer-wrap{width:100%;background:${border};border-radius:4px;height:8px;position:relative;overflow:hidden;}
.timer-bar{height:100%;border-radius:4px;transition:width 1s linear,background 0.5s;}
.timer-label{position:absolute;right:0;top:50%;transform:translateY(-50%);font-size:0.68rem;
 color:${muted};padding-right:4px;line-height:1;}
.timer-urgent{color:#e05555;animation:urgentPulse 0.5s ease infinite;}
@keyframes urgentPulse{0%,100%{opacity:1;}50%{opacity:0.4;}}

.reverse-target{background:rgba(100,180,255,0.08);border:1px solid rgba(100,180,255,0.25);
 border-radius:10px;padding:8px 14px;font-size:0.8rem;color:${dark?"#6ab4ff":"#1a60a0"};width:100%;text-align:center;}

.film-strip{display:flex;gap:7px;align-items:center;}
.degree-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:500;transition:all 0.3s;}
.degree-dot.filled{background:${gold};color:#0d0d0d;box-shadow:0 0 10px rgba(212,160,23,0.5);}
.degree-dot:not(.filled){background:transparent;border:2px solid ${border};color:${muted};}

.chain-log{width:100%;display:flex;flex-direction:column;gap:5px;}
.chain-step{display:flex;align-items:center;gap:6px;font-size:0.72rem;background:${bg3};
 border:1px solid ${border};border-radius:10px;padding:7px 10px;flex-wrap:wrap;position:relative;}
.chain-actor{color:${gold};font-weight:500;}
.chain-arrow{color:${muted};font-size:0.62rem;}
.chain-movie-wrap{display:flex;align-items:center;gap:5px;}
.chain-movie{color:#8ab4d4;font-style:italic;}

.actor-card{background:${card};border:2px solid ${gold};border-radius:16px;padding:18px 20px;text-align:center;
 width:100%;box-shadow:0 0 24px rgba(212,160,23,0.13);display:flex;flex-direction:column;align-items:center;gap:10px;}
.bacon-card{box-shadow:0 0 36px rgba(212,160,23,0.38);}
.actor-name{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:${text};}
.bacon-label{font-size:0.6rem;letter-spacing:4px;color:${gold};text-transform:uppercase;}

.hint-box{width:100%;background:rgba(212,160,23,0.07);border:1px solid rgba(212,160,23,0.28);
 border-radius:12px;padding:12px 14px;font-size:0.82rem;color:${dark?"#d4c9b0":text};line-height:1.6;}
.hint-label{font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:${gold};display:block;margin-bottom:5px;}
.hint-thinking-bar{width:100%;height:3px;background:${border};border-radius:2px;overflow:hidden;margin:7px 0 5px;}
.hint-thinking-fill{height:100%;background:linear-gradient(90deg,transparent,${gold},transparent);width:50%;border-radius:2px;animation:scanBar 1.4s ease-in-out infinite;}
@keyframes scanBar{0%{transform:translateX(-100%);}100%{transform:translateX(300%);}}
.hint-thinking-inner{display:flex;align-items:center;justify-content:center;gap:5px;height:18px;}
.thinking-dot{width:7px;height:7px;border-radius:50%;background:${gold};animation:thinkBounce 1.1s ease-in-out infinite;}
.thinking-dot:nth-child(1){animation-delay:0s;}
.thinking-dot:nth-child(2){animation-delay:0.18s;}
.thinking-dot:nth-child(3){animation-delay:0.36s;}
@keyframes thinkBounce{0%,80%,100%{transform:scale(0.6);opacity:0.4;}40%{transform:scale(1);opacity:1;}}
.hint-btn{position:relative;min-height:42px;}
.hint-thinking{border-color:${gold}!important;background:rgba(212,160,23,0.08)!important;cursor:wait!important;}

.input-section{width:100%;display:flex;flex-direction:column;gap:10px;}
.autocomplete-wrap{position:relative;width:100%;}
.input-label{font-size:0.65rem;letter-spacing:2px;text-transform:uppercase;color:${muted};display:block;margin-bottom:3px;}
.text-input{width:100%;background:${bg3};border:1px solid ${border};border-radius:10px;
 padding:12px 14px;font-family:'DM Mono',monospace;font-size:0.92rem;color:${text};
 outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.text-input:focus{border-color:${gold};box-shadow:0 0 0 3px rgba(212,160,23,0.14);}
.text-input:disabled{opacity:0.5;}
.ac-spinner{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:0.8rem;pointer-events:none;}
.ac-dropdown{position:absolute;top:calc(100% + 4px);left:0;right:0;background:${bg2};
 border:1px solid rgba(212,160,23,0.35);border-radius:10px;list-style:none;overflow:hidden;
 z-index:100;box-shadow:0 8px 32px rgba(0,0,0,0.4);animation:dropIn 0.12s ease;}
@keyframes dropIn{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}}
.ac-item{padding:9px 14px;font-size:0.82rem;color:${dark?"#d4c9b0":text};cursor:pointer;
 border-bottom:1px solid ${border};transition:background 0.1s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ac-item:last-child{border-bottom:none;}
.ac-item:hover,.ac-highlighted{background:rgba(212,160,23,0.12);color:${text};}

.game-tools-row{display:flex;gap:8px;}
.tool-btn{flex:1;background:${bg3};border:1px solid ${border};border-radius:10px;padding:10px;
 font-family:'DM Mono',monospace;font-size:0.78rem;color:${dark?"#d4c9b0":text};cursor:pointer;
 transition:all 0.18s;letter-spacing:0.5px;display:flex;align-items:center;justify-content:center;gap:5px;}
.tool-btn:hover:not(.tool-disabled){background:rgba(212,160,23,0.1);border-color:${gold};}
.tool-disabled{opacity:0.32;cursor:not-allowed;}
.degrees-label{font-size:0.66rem;color:${muted};letter-spacing:2px;text-transform:uppercase;}
.game-escape-row{display:flex;gap:12px;justify-content:center;}

.btn-primary{background:${gold};color:#0d0d0d;border:none;border-radius:10px;padding:12px 20px;
 font-family:'DM Mono',monospace;font-size:0.86rem;font-weight:500;cursor:pointer;transition:all 0.2s;letter-spacing:1px;}
.btn-primary:hover:not(:disabled){background:#e8b820;transform:translateY(-1px);box-shadow:0 4px 18px rgba(212,160,23,0.38);}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed;}
.btn-secondary{background:transparent;color:${gold};border:1.5px solid ${gold};border-radius:10px;padding:10px 16px;
 font-family:'DM Mono',monospace;font-size:0.82rem;cursor:pointer;transition:all 0.2s;letter-spacing:1px;}
.btn-secondary:hover{background:rgba(212,160,23,0.1);transform:translateY(-1px);}
.btn-ghost{background:transparent;border:none;color:${muted};font-family:'DM Mono',monospace;
 font-size:0.75rem;cursor:pointer;padding:5px 10px;border-radius:8px;transition:color 0.15s;}
.btn-ghost:hover{color:${dark?"#b8a98a":text};}
.btn-reveal{margin-top:10px;background:transparent;color:#8ab4d4;border:1px dashed #8ab4d4;
 border-radius:8px;padding:8px 16px;font-family:'DM Mono',monospace;font-size:0.76rem;cursor:pointer;
 transition:all 0.2s;letter-spacing:1px;}
.btn-reveal:hover{background:rgba(138,180,212,0.1);border-style:solid;}

.result-panel{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:540px;width:100%;margin-top:16px;}
.result-emoji{font-size:3.2rem;animation:pop 0.4s cubic-bezier(0.36,0.07,0.19,0.97);}
@keyframes pop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
.result-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;}
.win-panel .result-title{color:${gold};}
.lose-panel .result-title{color:#c0392b;}
.result-sub{font-size:0.84rem;color:${muted};text-align:center;line-height:1.7;}
.leaderboard-box{background:rgba(212,160,23,0.07);border:1px solid rgba(212,160,23,0.25);
 border-radius:12px;padding:12px 16px;width:100%;text-align:center;}
.lb-stat{font-size:0.82rem;color:${dark?"#d4c9b0":text};margin-bottom:4px;}
.lb-comment{font-size:0.75rem;color:${muted};margin-top:6px;font-style:italic;}
.stats-inline{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}
.stat-pill{background:${bg3};border:1px solid ${border};border-radius:20px;padding:5px 12px;font-size:0.73rem;color:${dark?"#d4c9b0":text};}
.chain-final{width:100%;}
.faster-box{background:rgba(212,160,23,0.07);border:1px solid rgba(212,160,23,0.25);
 border-radius:12px;padding:12px 16px;width:100%;font-size:0.82rem;line-height:1.7;color:${muted};}
.faster-box.optimal{border-color:rgba(100,200,120,0.3);background:rgba(100,200,120,0.07);color:${dark?"#90c490":"#2a7a2a"};}
.faster-path{margin-top:8px;display:flex;flex-direction:column;gap:4px;}
.faster-step{font-size:0.74rem;color:#8ab4d4;padding-left:8px;border-left:2px solid ${gold};}
.action-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}

.spinner{font-size:3rem;animation:spin 1s linear infinite;}
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
.shake{animation:shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97);}
@keyframes shake{10%,90%{transform:translateX(-2px);}20%,80%{transform:translateX(4px);}30%,50%,70%{transform:translateX(-6px);}40%,60%{transform:translateX(6px);}}
.error-msg{color:#e05555;font-size:0.79rem;line-height:1.5;}
.status-msg{color:${muted};font-size:0.79rem;line-height:1.5;}
 `;
}

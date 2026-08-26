import fs from 'node:fs';

const pagePath = 'client/public/books-music.html';
const html = fs.readFileSync(pagePath, 'utf8');

const tracks = [
  ['YALA (Slowed)', '—', 'slow', 'stretched time'],
  ['Forever', '—', 'late-night', '2am window seat'],
  ['Gani (feat. Manni Sandhu)', '—', 'punjabi', 'Punjabi warmth'],
  ['Hai Mera Dil', '—', 'candy', 'warm + loopable'],
  ['Ishq de Fanniyar - Female', '—', 'slow', 'lights off, slowed + reverb'],
  ['Hypnotic', '—', 'hypnotic', 'beautiful disorientation'],
  ['SAADI GALLI AAJA', '—', 'energy', 'push through'],
  ['Pani Da Rang', '—', 'slow', 'soft edges'],
  ['Sadi Sun', '—', 'punjabi', 'Punjabi energy'],
  ['Trapped', '—', 'hypnotic', 'ritual loop'],
  ['Mia Cara', '—', 'candy', 'bright + elastic'],
  ['Ban Ja Tu', '—', 'candy', 'candy + bounce'],
  ['Mera Mann', '—', 'slow', 'reflective drift'],
  ['Crazy4U (Official Video) | @Kunwarrmusic', '—', 'punjabi', 'full-volume feeling'],
  ['Dil De Baithi', '—', 'punjabi', 'heart on sleeve'],
  ['Dreams', '—', 'late-night', 'night-window glow'],
  ['Big Plans', '—', 'energy', 'forward motion'],
  ['Jaguar', '—', 'energy', 'sharp confidence'],
  ['Be Mine', '—', 'candy', 'sweet insistence'],
  ['Brown Baddie', '—', 'punjabi', 'bold Punjabi pulse'],
  ['WANG', '—', 'punjabi', 'hard Punjabi'],
  ['Boom Shaka', '—', 'energy', 'beat as a lever'],
  ['Dooriyan', '—', 'slow', 'distance + reverb'],
  ['BLISS', '—', 'hypnotic', 'beautiful disorientation'],
  ['12 Saal', '—', 'punjabi', 'memory in motion'],
  ['La La La', '—', 'candy', 'playful loop'],
  ['AZUL', '—', 'hypnotic', 'eyes closed'],
].map(([title, artist, mood, label]) => ({ title, artist, mood, label }));

const esc = (value) => value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
const trackSource = tracks.map((track) => `{title:'${esc(track.title)}',artist:'${esc(track.artist)}',mood:'${track.mood}',label:'${esc(track.label)}',color:'${track.mood === 'energy' ? '#f8cf45' : track.mood === 'hypnotic' ? '#1a8b4c' : track.mood === 'slow' || track.mood === 'late-night' ? '#171412' : '#ef4937'}'}`).join(',');
const querySource = tracks.map((track) => `'${esc(track.title)}'`).join(',');

const nextHtml = html
  .replace(/var unboxedTracks=\[.*?\];var artByMood/s, `var unboxedTracks=[${trackSource}];var artByMood`)
  .replace(/var musicQueries=\[.*?\];var bookStatus/s, `var musicQueries=[${querySource}];var bookStatus`);

if (nextHtml === html) throw new Error('Music data replacement made no changes');
fs.writeFileSync(pagePath, nextHtml);
console.log(`Added ${tracks.length} supplied songs and expanded iTunes lookup coverage.`);

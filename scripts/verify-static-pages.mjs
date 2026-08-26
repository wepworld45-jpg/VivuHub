import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('dist/public');
const requiredPages = [
  'index.html',
  'books-music.html',
  'books-map.html',
  'projects.html',
  'cinema.html',
  'pattern.html',
  'vivu-os.html',
  'ideas.html',
];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(fs.existsSync(outputDir), `Missing production output: ${outputDir}`);
assert(fs.existsSync(path.join(outputDir, 'favicon.svg')), 'Missing repository-safe favicon.svg');

for (const page of requiredPages) {
  const filePath = path.join(outputDir, page);
  assert(fs.existsSync(filePath), `Missing required route: ${page}`);
  if (!fs.existsSync(filePath)) continue;

  const html = fs.readFileSync(filePath, 'utf8');
  assert(!html.includes('manus-storage'), `${page} contains an unsafe Manus storage reference`);
  assert(!/<(?:a|link|script|img|source|video|audio)[^>]+(?:href|src)="\/[^"]+"[^>]*>/i.test(html), `${page} contains a root-absolute asset or link that can break on GitHub Pages`);
}

const booksMap = fs.readFileSync(path.join(outputDir, 'books-map.html'), 'utf8');
assert(booksMap.includes('data-status'), 'Books Map status metadata is missing');
assert(booksMap.includes('Reading first'), 'Books Map Reading-first behavior is missing');
assert(booksMap.includes('data-synopsis'), 'Books Map synopsis preview is missing');
assert(booksMap.includes('requestIdleCallback'), 'Books Map preview scheduling is missing');

const booksMusic = fs.readFileSync(path.join(outputDir, 'books-music.html'), 'utf8');
assert(booksMusic.includes('REQUEST_TIMEOUT'), 'Books + Music request timeout is missing');
assert(booksMusic.includes('requestIdleCallback'), 'Books + Music idle scheduling is missing');
assert(booksMusic.includes('createElement(\'audio\')'), 'Books + Music shared audio player is missing');

if (failures.length) {
  console.error('Static verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static verification passed for ${requiredPages.length} required routes, favicon, Books Map, and Books + Music safeguards.`);

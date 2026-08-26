import fs from "node:fs";
import path from "node:path";

const items = [
  {
    slug: "inception",
    title: "Inception",
    eyebrow: "Nolan / 2010",
    palette: "coral",
    tags: ["reality", "architecture", "memory"],
    note: "I return to Inception when I want a story that feels engineered without becoming cold. The dream layers are a puzzle, but the emotional engine is still a simple question about letting go.",
    matters: "It reminds me that ambitious systems only work when they are carrying a human reason. The rules are memorable because every mechanism is tied to guilt, grief, or desire.",
    lines: ["A machine made of memory", "The cleanest kind of confusion", "Emotion is the final level"]
  },
  {
    slug: "the-matrix",
    title: "The Matrix",
    eyebrow: "Wachowski / 1999",
    palette: "blue",
    tags: ["choice", "systems", "awakening"],
    note: "The first watch is about the reveal. Later watches are about the texture of the world before and after it: the small signs that a system is shaping what feels normal.",
    matters: "It gives language to the moment when a person stops accepting the default setting. That is useful beyond the film: question the interface, then choose what deserves your attention.",
    lines: ["Wake up, then look closer", "The interface is part of the story", "Choice is a practice"]
  },
  {
    slug: "iron-man-1",
    title: "Iron Man 1",
    eyebrow: "Favreau / 2008",
    palette: "yellow",
    tags: ["invention", "identity", "origin"],
    note: "What stays with me is the workshop energy: scraps, prototypes, failures, and the pleasure of making an idea visible. The suit is less interesting than the process that builds it.",
    matters: "It treats invention as a change in responsibility, not just a change in capability. The best version of a project is the one that makes its maker more accountable.",
    lines: ["Build the first rough version", "Capability needs a conscience", "The workshop is the origin"]
  },
  {
    slug: "murder-mystery",
    title: "Murder Mystery",
    eyebrow: "On repeat / comfort mystery",
    palette: "coral",
    tags: ["mystery", "comedy", "rewatch"],
    note: "This is a lighter kind of decoding: a warm, social mystery where the pleasure comes from watching a pair of characters notice what everyone else misses.",
    matters: "It keeps investigation playful. Not every mystery has to feel heavy; sometimes a good story is a room, a handful of clues, and the permission to enjoy being curious.",
    lines: ["Clues with a lighter step", "Chemistry is evidence", "Curiosity can be fun"]
  },
  {
    slug: "dark",
    title: "Dark",
    eyebrow: "Series / time and inheritance",
    palette: "blue",
    tags: ["time", "family", "consequence"],
    note: "Dark rewards a notebook. Its family lines and timelines turn memory into geography, and every answer makes the emotional map more complicated.",
    matters: "It makes consequence feel physical. A decision can echo through generations, but the story keeps returning to the question of whether understanding a pattern is enough to break it.",
    lines: ["A family tree as a labyrinth", "Every answer opens a door", "Patterns can be interrupted"]
  },
  {
    slug: "stranger-things",
    title: "Stranger Things",
    eyebrow: "Series / friendship under pressure",
    palette: "coral",
    tags: ["friendship", "atmosphere", "other worlds"],
    note: "The supernatural hook matters, but the emotional anchor is the group: kids translating fear into teamwork, jokes, stubbornness, and loyalty.",
    matters: "It shows why an atmosphere only works when there is someone worth protecting inside it. The strange world becomes memorable because the relationships give it stakes.",
    lines: ["The group is the compass", "Fear needs a witness", "Atmosphere follows emotion"]
  },
  {
    slug: "premalu",
    title: "Premalu",
    eyebrow: "Malayalam / modern romance",
    palette: "yellow",
    tags: ["romance", "timing", "everyday life"],
    note: "Premalu finds drama in ordinary awkwardness. The humor feels lived-in, and the characters are allowed to be messy without turning that mess into a lesson too quickly.",
    matters: "It reminds me that emotional precision does not require a dark tone. Small misunderstandings, timing, and kindness can carry an entire story.",
    lines: ["Awkwardness with rhythm", "Timing is a character", "Small feelings, sharply seen"]
  },
  {
    slug: "thudarum",
    title: "Thudarum",
    eyebrow: "Malayalam / tension and aftermath",
    palette: "coral",
    tags: ["tension", "family", "aftermath"],
    note: "I notice how the film lets pressure accumulate through ordinary spaces. The suspense is not just an event; it is the way a home, a relationship, or a routine starts to feel altered.",
    matters: "It makes aftermath part of the plot. What happens next is often where character becomes clearest, and that is the kind of detail I want this library to remember.",
    lines: ["The room changes first", "Aftermath is evidence", "Routine can hold suspense"]
  },
  {
    slug: "kannur-squad",
    title: "Kannur Squad",
    eyebrow: "Malayalam / procedural",
    palette: "blue",
    tags: ["teamwork", "investigation", "grounded"],
    note: "The appeal is procedural patience: people with different strengths moving through facts, terrain, and fatigue until the case starts to take shape.",
    matters: "It respects process. The breakthrough is earned by attention, collaboration, and the willingness to keep looking when the first explanation is convenient.",
    lines: ["Process creates momentum", "A team is a tool", "Look again at the detail"]
  },
  {
    slug: "rorschach",
    title: "Rorschach",
    eyebrow: "Malayalam / moral ambiguity",
    palette: "yellow",
    tags: ["psychology", "ambiguity", "revenge"],
    note: "Rorschach stays interesting because identity is never presented as a clean answer. The film keeps shifting the distance between what a person says, what they do, and what others project onto them.",
    matters: "It makes interpretation feel ethically charged. Reading a character is not the same as excusing them, and that tension is exactly why the film stays open after the credits.",
    lines: ["A face can be a mask", "Interpretation has consequences", "Certainty is suspicious"]
  },
  {
    slug: "charlie",
    title: "Charlie",
    eyebrow: "Malayalam / wonder and movement",
    palette: "coral",
    tags: ["wonder", "travel", "generosity"],
    note: "Charlie feels like an invitation to move through the world with more openness. Its energy comes from encounters: each person leaves a small change in the next person’s path.",
    matters: "It protects wonder from becoming vague. Wonder is shown as a behavior—notice, travel, listen, and make room for someone else’s unfinished story.",
    lines: ["A map made of encounters", "Wonder is an action", "Leave the door open"]
  },
  {
    slug: "suits",
    title: "Suits",
    eyebrow: "Series / language as leverage",
    palette: "blue",
    tags: ["ambition", "dialogue", "strategy"],
    note: "I like the velocity of Suits: fast dialogue, visible stakes, and people using language as both armor and negotiation. It is a study in how confidence changes a room.",
    matters: "It makes communication feel like a craft. The show is a reminder to prepare the thought, read the room, and understand the difference between sounding certain and being right.",
    lines: ["Words move the room", "Confidence is a signal", "Strategy needs substance"]
  }
];

function page(item) {
  const tags = item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  const lines = item.lines.map((line, index) => `<div class="item"><strong>0${index + 1}</strong><small>${line}</small></div>`).join("");
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VivuHub / ${item.title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="./subpages.css"></head>
<body><main class="page-shell detail-shell"><nav class="page-nav"><a class="nav-back" href="./cinema.html">← Back to Cinema</a><span class="nav-mark">VIVUHUB / CINEMA</span></nav><header class="detail-hero ${item.palette}"><div><div class="kicker">${item.eyebrow}</div><h1 class="display">${item.title}</h1></div><div class="detail-summary"><p class="lede">A personal index card for a story that keeps returning with a different question.</p><div class="tag-list" aria-label="Tags">${tags}</div></div></header><section class="detail-layout"><article class="detail-note"><div class="kicker">Personal note</div><p>${item.note}</p></article><article class="detail-why"><div class="kicker">Why it matters</div><h2>Keep this<br>thread open.</h2><p>${item.matters}</p></article></section><section class="list-section detail-lines"><div class="section-title"><h2>What stays</h2><div class="kicker">The residue after the credits.</div></div><div class="item-list">${lines}</div></section><footer class="page-footer"><span>VIVUHUB / ${item.title.toUpperCase()}</span><a href="./cinema.html">Return to the cinema map →</a></footer></main></body></html>`;
}

const targets = [".", "client/public"];
for (const target of targets) {
  for (const item of items) {
    fs.writeFileSync(path.join(target, `cinema-${item.slug}.html`), page(item));
  }
}

const cards = items.map((item, index) => `<a class="film-card ${item.palette}" href="./cinema-${item.slug}.html"><span class="film-number">${String(index + 1).padStart(2, "0")}</span><strong>${item.title}</strong><span class="film-tags">${item.tags.join(" / ")}</span><span class="film-arrow">↗</span></a>`).join("");
for (const file of ["cinema.html", "client/public/cinema.html"]) {
  let html = fs.readFileSync(file, "utf8");
  const marker = "<section class=\"list-section\">";
  const insertion = `<section class="film-library"><div class="section-title"><h2>Open a thread</h2><div class="kicker">Notes, tags, and the reason it stays.</div></div><div class="film-grid">${cards}</div></section>`;
  if (!html.includes("class=\"film-library\"")) html = html.replace(marker, insertion + marker);
  fs.writeFileSync(file, html);
}

console.log(`Generated ${items.length} Cinema detail pages in root and client/public.`);


## Interaction smoke tests

The MONEY filter reduces the collection to four keepers, while the PSYCHOLOGY filter also returns four keepers. Keyboard Enter opens the first visible card; the fresh card DOM reports `aria-expanded="true"`, an updated “Close keeper” label, and a visible keeper note. The Add a keeper form opens with `aria-expanded="true"` and `aria-hidden="false"`; submitting a temporary keeper produced 21 cards and persisted the entry to local storage. The temporary test entry was removed and the page reloaded afterward.

## Responsive visual verification

A full-page desktop capture at 1280px shows the intended wide scatter of twenty cards, hard shadows, dotted background, compact filter pills, and the add-keeper control. A full-page mobile capture at 390px shows the header, filters, and keeper cards safely stacked into two columns with readable labels and no horizontal overflow.

## Synopsis and personal-note enhancement

All twenty built-in keepers now have expanded personal notes and synopsis copy. Every visible card exposes a `Read synopsis` control after unboxing. The dialog opens with the correct title, author, mood, theme, synopsis, keeper note, and an Open Library search URL; it closes from the close button or backdrop and restores focus to the triggering preview control. The MONEY filter returns four cards, and all four retain meaningful keeper notes. Build and TypeScript checks pass.

## Reading-status verification

Cards now show a To read, Reading, or Finished badge. The first card’s status selector successfully changed the badge to Reading, persisted the status in `localStorage`, and the fresh Reading filter returned one keeper with an active Reading pill. The status was restored to To read afterward for a clean preview. Status controls are present in the expanded card and the Add a keeper form includes the same three status options.

## Status visual verification

Desktop capture shows separate Mood and Reading Status filter groups above the card wall, while every card carries a compact status badge. Mobile capture shows the groups wrapping cleanly and cards retaining readable status badges without horizontal overflow.

## Reading-first ordering verification

After changing The Psychology of Money to Reading, it moved to position 01 and displayed the Reading badge. The MONEY mood filter preserved it as the first result, followed by the other MONEY keepers in their original order. The sample status was returned to To read after verification. The sort uses Reading priority followed by the original source index, so cards with other statuses retain stable ordering.

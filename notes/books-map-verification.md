
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

## Books Map music player verification

The Books Map now includes a dark “Read with a pulse” widget with eight curated tracks from the VivuHub taste map. The iTunes Search API resolved eight short preview URLs in the local preview. A real browser click started the YALA (Slowed) preview and showed the native 30-second audio controls; switching to Gani (feat. Manni Sandhu) stopped the first preview and started the Punjabi preview; clicking Gani again paused it. Track labels, mood metadata, loading status, and single-player behavior rendered correctly.

## Music widget responsive verification

Desktop capture shows the dark listening layer with a single native audio player and eight compact track cards above the book filters. Mobile capture stacks the player controls and keeps the eight tracks in a two-column grid without horizontal overflow; the book filters and card wall remain intact below. The existing Books Map visual language and Reading-first metadata remain consistent.

## Fresh-load smoke test

A fresh Books Map load confirmed one audio player, eight track buttons, eight enabled iTunes previews, 20 book cards, seven mood-filter pills, and four reading-status filter pills. The player status reported “8 short previews ready • tap a signal to listen.”

## Performance baseline

Fresh desktop load completed quickly in the local preview, but the page launches eight parallel iTunes Search requests for the eight player tracks. The document is about 43 KB decoded, with 12 measured resources, one audio element, and no image elements on the Books Map route. The main perceived delay is the preview-request burst and player initialization rather than image payloads; the existing book card wall is already static and immediately rendered.

## Performance optimization verification

The optimized route renders book content immediately while preview lookup starts during idle time. Fresh local verification reported DOM-ready at about 40 ms, 20 book cards, 11 mood/status filter controls, eight iTunes requests, zero disabled preview buttons after lookup, and “8/8 short previews ready • more loaded quietly.” Preview metadata is cached for 24 hours; future loads can avoid the request burst entirely. Each request now times out after 4.5 seconds instead of holding the page indefinitely.

## Responsive performance verification

Mobile and desktop full-page captures show the listening layer, filters, and tactile book cards staying within the viewport with no horizontal overflow. Preview metadata can load quietly after the first paint, and cached previews report immediately on subsequent loads. The existing Reading-first card ordering and book interaction density remain visually stable at both sizes.

## Final playback smoothness check

After the performance changes, a fresh local reload reported the preview cache immediately and a real click started YALA (Slowed) without waiting for a new lookup. The player showed the active state and “Playing short preview” status while all book filters and cards stayed rendered.

## Final desktop/mobile smoothing pass

The final desktop and mobile captures show the page rendering with the same tactile composition, no horizontal overflow, and no layout shift while the player metadata is cached or loaded. The listening layer remains compact on mobile, and the 20-card book wall, filters, Reading-first ordering, and synopsis controls remain intact.


## Interaction smoke tests

The MONEY filter reduces the collection to four keepers, while the PSYCHOLOGY filter also returns four keepers. Keyboard Enter opens the first visible card; the fresh card DOM reports `aria-expanded="true"`, an updated “Close keeper” label, and a visible keeper note. The Add a keeper form opens with `aria-expanded="true"` and `aria-hidden="false"`; submitting a temporary keeper produced 21 cards and persisted the entry to local storage. The temporary test entry was removed and the page reloaded afterward.

## Responsive visual verification

A full-page desktop capture at 1280px shows the intended wide scatter of twenty cards, hard shadows, dotted background, compact filter pills, and the add-keeper control. A full-page mobile capture at 390px shows the header, filters, and keeper cards safely stacked into two columns with readable labels and no horizontal overflow.

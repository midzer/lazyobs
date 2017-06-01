# lazyobs
Lazy load any images and videos with modern Intersection Observer API.

## Demo
lazyobs is used at https://feuerwehr-eisolzried.de/media/

## How to use
Simply include `<script src="/js/lazyobs.min.js" async></script>` right before `</body>`.

Add `lazy` class to any image or video below the fold. I recommend skipping elements in inital viewport, because you want those to load as fast as possibe. Lazy loading kicks in immediately for new content entering viewport after scroll or any other visible UI change.

## Browser support
Currently Chrome > 56, Firefox > 55, Edge 15.
For recent support check https://caniuse.com/#search=IntersectionObserver

## Fallback
If Intersection Observer is not supported in your browser, all lazy elements are loaded at once.

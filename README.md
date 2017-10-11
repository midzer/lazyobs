# lazyobs
Lazy load any images, videos and (heavy) components needing individual JavaScipt with Intersection Observer API.

## Demo
lazyobs is used at https://feuerwehr-eisolzried.de/
Video example is at https://feuerwehr-eisolzried.de/media/

## How to use
Simply include `<script src="/js/lazyobs.min.js" async></script>` right before `</body>`.

Add `lazy` class to any image, video or component which needs JS to operate.

Don't forget to put and `id=COMPONENT` for your lazy components which will point to your `/assets/js/COMPONENT.js`. For example Demo calendar HTML snippet is `<div id="calendar" class="lazy"></div>` which lazy loads JS file `calendar.js` via Promise.

Lazy loading kicks in right before for new content entering viewport after scroll or any other visible UI change.

## Animation
Maybe you want to animate your images after being loaded?

Just put following code to your css:
```
.lazy {
  opacity: 0;
  will-change: opacity;
}

.loaded {
  animation: fadeIn 0.5s ease-in;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

## Browser support
Currently Chrome > 51, Firefox > 55, Edge 15. For recent support check [here](https://caniuse.com/#search=IntersectionObserver). Use [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) to support older browsers.

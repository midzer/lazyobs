# lazyobs
Lazy load any images, videos and components needing individual (heavy) JavaScipt with Intersection Observer API.

## Demo
lazyobs is used at https://feuerwehr-eisolzried.de/

Video example https://feuerwehr-eisolzried.de/media/

## How to use
Simply include `<script src="/js/lazyobs.min.js" async></script>` right before `</body>`.

* Add `lazy` class and `data-src` to any image, video or component which needs JS.

Lazy loading kicks in right before for new content entering viewport after scroll or any other visible UI change.

## Example
* Image: `<img class="lazy" data-src="/assets/images/funkycat.jpg">`
* Video:
```
<video class="lazy" controls preload="metadata">
  <source data-src="/assets/videos/funkycat.webm" type="video/webm">
  <source data-src="/assets/videos/funkycat.mp4" type="video/mp4">  
  Your browser does not support this tag.
</video>
```
* Component: `<div class="lazy" data-src="/assets/js/calendar.js"></div>`

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

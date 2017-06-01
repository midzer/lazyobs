// Lazy load images and videos
// 1. Convert node list of all elements with data-src attributed to array
var els = document.querySelectorAll('.lazy');
if (els.length > 0) {
    function replaceSrc(element) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
    }
    function addLoaded(element) {
        element.classList.add('loaded');
    }
    function load(element) {
        if (element.nodeName == 'VIDEO') {
            var sources = element.getElementsByTagName('source');
            for (let i = 0; i < sources.length; i++) {
                replaceSrc(sources[i]);
            }
            element.load();
            element.onloadstart = function() { addLoaded(element) };
        }
        else {
            replaceSrc(element);
            element.onload = function() { addLoaded(element) };
        }
    }

    if (! ('IntersectionObserver' in window)) {
        console.log('Intersection Observer not supported');
        for (var i = 0; i < els.length; i++) {
            load(els[i]);
        }
    } else {
    // 2. Create the IntersectionObserver and bind it to the function we want it to work with
    var observer = new IntersectionObserver(onChange, {
        threshold: 0.5
    });
    
    function onChange(changes) {
        // 3. For each element that we want to change
        changes.forEach(change => {
            // Edge 15 doesn't support isIntersecting, but we can infer it from intersectionRatio
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
            if (change.intersectionRatio > 0) {
                // 4. take url from `data-src` attribute
                load(change.target);

                // 5. Stop observing the current target
                observer.unobserve(change.target);
            }
        })
    }
    // 6. Observe each image derived from the array above
    els.forEach(el => observer.observe(el));
    }
}


function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function replaceSrc(element) {
    element.src = element.dataset.src;
    element.removeAttribute('data-src');
}

function removeHint() {
    this.style.willChange = 'auto';
}

function addLoaded(element) {
    element.addEventListener('animationend', removeHint);
    element.classList.add('loaded');
}

function loadScript(element) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.async = true;
        script.src = element.dataset.src;
        element.removeAttribute('data-src');
        script.onload = function() {
            resolve(script.src);
            addLoaded(element);
        };
        script.onerror = reject;
        if (document.head.lastChild != script) {
            document.head.appendChild(script);
        }
    });
}

function load(element) {
    if (element.nodeName == 'VIDEO') {
        // <video> element
        element.onloadstart = function() { addLoaded(element) };
        var sources = element.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            replaceSrc(sources[i]);
        }
        element.load();
    }
    else if (element.nodeName == 'IMG') {
        // <img> element
        element.onload = function() { addLoaded(element) };
        replaceSrc(element);
    }
    else {
        // any element with data-src
        loadScript(element);
    }
}

// Pre-load items that are within 2 multiples of the visible viewport height.
var observer = new IntersectionObserver(function(changes) {
    changes.forEach(function(change) {
        // Edge 15 doesn't support isIntersecting, but we can infer it
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12156111/
        // https://github.com/WICG/IntersectionObserver/issues/211
        const isIntersecting = (typeof change.isIntersecting === 'boolean') ?
        change.isIntersecting : change.intersectionRect.height > 0;
        if (isIntersecting) {
            load(change.target);

            // 5. Stop observing the current target
            observer.unobserve(change.target);
        }
    });
  },
  { rootMargin: "150px 0px" }
);

query(".lazy").forEach(function(item) {
    observer.observe(item);
});

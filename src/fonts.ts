// The type families, served from the site itself instead of Google Fonts: no
// request to another origin and no stylesheet that holds the first paint. Only the
// Latin subset (Portuguese and English) and the weights in use.
//
// They load once the first paint is on screen: the prerendered page shows at once
// in the system's fonts and switches to these a moment later (font-display: swap).

// Calls `load` after the browser has painted something, or after `ms` at most.
function afterFirstPaint(load: () => void, ms = 3000) {
    let done = false;
    const once = () => {
        if (done) return;
        done = true;
        load();
    };
    if (typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("paint")) {
        const observer = new PerformanceObserver((list) => {
            if (list.getEntriesByName("first-contentful-paint").length) {
                observer.disconnect();
                once();
            }
        });
        observer.observe({ type: "paint", buffered: true });
    }
    setTimeout(once, ms);
}

export function loadFonts() {
    afterFirstPaint(() => import("./fonts-faces"));
}

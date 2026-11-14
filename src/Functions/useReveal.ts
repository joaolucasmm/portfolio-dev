import { useEffect } from "react";

// Section entrances: every [data-reveal] child rises into place once its
// section enters the viewport. Without IntersectionObserver nothing is hidden.
function useReveal() {
    useEffect(() => {
        if (!("IntersectionObserver" in window)) return undefined;
        const root = document.documentElement;
        root.classList.add("can-reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -12% 0px" }
        );

        const watch = () =>
            document
                .querySelectorAll("[data-reveal]:not(.is-in)")
                .forEach((el) => observer.observe(el));
        watch();

        // Content swaps (language, opened panels) can add new elements.
        const mutations = new MutationObserver(watch);
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutations.disconnect();
            root.classList.remove("can-reveal");
        };
    }, []);
}

export default useReveal;

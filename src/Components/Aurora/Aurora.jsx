import { useEffect, useRef } from "react";

// How far the light trails the pointer each frame (0–1). Low values give it weight.
const FOLLOW = 0.06;

// The coloured light behind the glass cards: four blurred blobs that drift slowly
// and lean toward the pointer, each by its own amount (set in style.scss), so the
// layers read at different depths. Touch screens and reduced motion keep it still.
function Aurora() {
    const box = useRef(null);

    useEffect(() => {
        if (typeof window.matchMedia !== "function") return undefined;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!finePointer.matches || reduced.matches) return undefined;

        const target = { x: 0, y: 0 };
        const now = { x: 0, y: 0 };
        let frame = 0;

        const step = () => {
            now.x += (target.x - now.x) * FOLLOW;
            now.y += (target.y - now.y) * FOLLOW;
            box.current.style.setProperty("--mx", now.x.toFixed(4));
            box.current.style.setProperty("--my", now.y.toFixed(4));
            const settled = Math.abs(target.x - now.x) < 0.001 && Math.abs(target.y - now.y) < 0.001;
            frame = settled ? 0 : requestAnimationFrame(step);
        };

        // −1 at the left or top edge of the window, 1 at the right or bottom.
        const onMove = (e) => {
            target.x = (e.clientX / window.innerWidth) * 2 - 1;
            target.y = (e.clientY / window.innerHeight) * 2 - 1;
            if (!frame) frame = requestAnimationFrame(step);
        };

        // Leaving the window lets the light drift back to the middle.
        const onLeave = () => {
            target.x = 0;
            target.y = 0;
            if (!frame) frame = requestAnimationFrame(step);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div className="aurora" aria-hidden="true" ref={box}>
            <i />
            <i />
            <i />
            <i />
        </div>
    );
}

export default Aurora;

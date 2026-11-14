import { useMedia } from "./client";

// True while the viewport is phone sized ($phone in style.scss). The prerendered
// page is the computer layout; phones switch right after hydration.
function usePhone() {
    return useMedia("(max-width: 720px)");
}

export default usePhone;

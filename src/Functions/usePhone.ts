import { useEffect, useState } from "react";

// True while the viewport is phone sized ($phone in style.scss).
function usePhone() {
    const query = "(max-width: 720px)";
    const [phone, setPhone] = useState(() => typeof window.matchMedia === "function" && window.matchMedia(query).matches);
    useEffect(() => {
        if (typeof window.matchMedia !== "function") return undefined;
        const list = window.matchMedia(query);
        const onChange = () => setPhone(list.matches);
        list.addEventListener?.("change", onChange);
        return () => list.removeEventListener?.("change", onChange);
    }, []);
    return phone;
}

export default usePhone;

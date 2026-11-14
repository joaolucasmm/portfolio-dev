// Renders the page to HTML at build time (scripts/prerender.mjs), so the first
// paint does not wait for the JavaScript; src/index.tsx then hydrates it.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export function render() {
    return renderToString(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

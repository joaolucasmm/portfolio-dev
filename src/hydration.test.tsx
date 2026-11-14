// The built page is prerendered and then hydrated. If the first browser render
// differs from the HTML (a date, the platform, a media query read while rendering),
// React throws the HTML away and renders again, and logs an error. This test does
// both steps, as the build and the browser do, and fails on any such error.
import { StrictMode, act } from "react";
import { hydrateRoot } from "react-dom/client";
import { render } from "./entry-server";
import App from "./App";

beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
    // Lets React's act() run here as it does in Testing Library.
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

test("the prerendered page hydrates without a mismatch", async () => {
    const container = document.createElement("div");
    container.innerHTML = render();
    document.body.appendChild(container);

    const errors: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
        errors.push(args.map(String).join(" "));
    });
    await act(async () => {
        hydrateRoot(
            container,
            <StrictMode>
                <App />
            </StrictMode>,
            { onRecoverableError: (error) => errors.push(String(error)) }
        );
    });
    spy.mockRestore();

    expect(errors).toEqual([]);
});

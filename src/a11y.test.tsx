import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import App from "./App";

// jsdom has no layout or colours, so contrast is left to Lighthouse in the pipeline.
const rules = { "color-contrast": { enabled: false } };

beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
});

describe("accessibility (axe)", () => {
    test("the page has no violations in English", async () => {
        const { container } = render(<App />);
        expect(await axe(container, { rules })).toHaveNoViolations();
    });

    test("the page has no violations in Portuguese", async () => {
        const { container } = render(<App />);
        fireEvent.click(screen.getAllByRole("button", { name: /Switch to Português/ })[0]);
        expect(document.documentElement.lang).toBe("pt-BR");
        expect(await axe(container, { rules })).toHaveNoViolations();
    });

    test("the open search has no violations", async () => {
        const { container } = render(<App />);
        fireEvent.click(screen.getAllByRole("button", { name: "Search" })[0]);
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "vue" } });
        expect(await axe(container, { rules })).toHaveNoViolations();
    });
});

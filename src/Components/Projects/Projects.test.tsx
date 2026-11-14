import { act, fireEvent, render, screen } from "@testing-library/react";
import content from "../../content";
import Projects from "./Projects";

const t = content.english.work;
const names = t.items.map((item) => item.name);

// The chosen project is the one whose dot is marked current.
const chosen = () => screen.getAllByRole("button", { name: new RegExp("^" + t.goTo + " ") })
    .filter((dot) => dot.classList.contains("work__dot"))
    .findIndex((dot) => dot.getAttribute("aria-current") === "true");

const stage = () => screen.getByRole("region", { name: t.hint });

describe("Projects showcase", () => {
    test("starts on the first project, which is the only usable slide", () => {
        const { container } = render(<Projects t={t} />);
        expect(chosen()).toBe(0);
        const active = container.querySelectorAll(".project.is-active");
        expect(active).toHaveLength(1);
        expect(active[0]).toHaveTextContent(names[0]);
        expect(active[0]).not.toHaveAttribute("aria-hidden", "true");
    });

    test("the arrows move one project and wrap around the ends", () => {
        render(<Projects t={t} />);
        fireEvent.click(screen.getByRole("button", { name: t.following }));
        expect(chosen()).toBe(1);
        fireEvent.click(screen.getByRole("button", { name: t.previous }));
        fireEvent.click(screen.getByRole("button", { name: t.previous }));
        expect(chosen()).toBe(names.length - 1);
    });

    test("a dot opens its project", () => {
        render(<Projects t={t} />);
        const dots = document.querySelectorAll(".work__dot");
        fireEvent.click(dots[2]);
        expect(chosen()).toBe(2);
    });

    test("arrow keys, Home and End work on the stage", () => {
        render(<Projects t={t} />);
        fireEvent.keyDown(stage(), { key: "ArrowRight" });
        expect(chosen()).toBe(1);
        fireEvent.keyDown(stage(), { key: "End" });
        expect(chosen()).toBe(names.length - 1);
        fireEvent.keyDown(stage(), { key: "Home" });
        expect(chosen()).toBe(0);
        fireEvent.keyDown(stage(), { key: "ArrowLeft" });
        expect(chosen()).toBe(names.length - 1);
    });

    test("each project has one element with its id, for the search", () => {
        const { container } = render(<Projects t={t} />);
        names.forEach((_, i) => expect(container.querySelectorAll("#project-" + i)).toHaveLength(1));
    });

    test("the search opens a project through portfolio:open-project", () => {
        render(<Projects t={t} />);
        act(() => {
            window.dispatchEvent(new CustomEvent("portfolio:open-project", { detail: 2 }));
        });
        expect(chosen()).toBe(2);
    });

    test("the small cards show the next projects and open them", () => {
        const { container } = render(<Projects t={t} />);
        const minis = container.querySelectorAll(".project.is-active .project__mini");
        expect([...minis].map((m) => m.textContent)).toEqual([names[1], names[2]]);
        fireEvent.click(minis[1]);
        expect(chosen()).toBe(2);
    });
});

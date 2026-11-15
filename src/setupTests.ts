// Testing Library's DOM matchers (toBeInTheDocument, toHaveTextContent, …) and
// axe's toHaveNoViolations, on Vitest's expect.
import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

declare module "vitest" {
    interface Assertion<T> {
        toHaveNoViolations(): T;
    }
}

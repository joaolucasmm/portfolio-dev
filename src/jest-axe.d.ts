// jest-axe ships no types, and @types/jest-axe brings Jest's globals with it,
// which clash with Vitest's. Only what the tests use is declared here.
declare module "jest-axe" {
    import type { AxeResults, RunOptions } from "axe-core";

    export function axe(html: Element | string, options?: RunOptions): Promise<AxeResults>;
    export const toHaveNoViolations: {
        toHaveNoViolations(results: AxeResults): { pass: boolean; message(): string };
    };
}

// What React 18's types leave out and the page uses.
import "react";

declare module "react" {
    // Custom properties read by style.scss, e.g. style={{ "--k": i }}.
    interface CSSProperties {
        [property: `--${string}`]: string | number | undefined;
    }

    // inert, which React 18 passes through as a string ("" means on). The type
    // parameter has to match React's own declaration for the two to merge.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
        inert?: "" | undefined;
    }
}

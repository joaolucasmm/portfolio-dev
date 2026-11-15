// The search palette opens a project or a role through these events; the detail
// is the item's index in the copy.
interface WindowEventMap {
    "portfolio:open-project": CustomEvent<number>;
    "portfolio:open-experience": CustomEvent<number>;
}

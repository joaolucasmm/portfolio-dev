import { useEffect, useRef, useState, type JSX, type SVGProps } from "react";
import { links, type Language } from "../../content";
import resumeEnglish from "../../Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf";
import resumePortuguese from "../../Assets/Documents/JoaoLucasMirandaMenegassoCurriculo.pdf";

// The résumé PDF in the page's language, linked from the hero and the contact section.
export const resume: Record<Language, string> = { english: resumeEnglish, portuguese: resumePortuguese };

// The four ways to reach João, shared by the hero circles and the contact list.
// GitHub and LinkedIn open in a new tab; email and phone are copied.
interface LinkChannel {
    id: "github" | "linkedin";
    name: string;
    text: string;
    href: string;
}
export interface CopyChannel {
    id: "email" | "phone";
    text: string;
    copy: string;
}
export type Channel = LinkChannel | CopyChannel;
type ChannelId = Channel["id"];

const brand: SVGProps<SVGSVGElement> = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
const line: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

export const icons: Record<ChannelId, JSX.Element> = {
    github: (
        <svg {...brand}>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    ),
    linkedin: (
        <svg {...brand}>
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z" />
        </svg>
    ),
    email: (
        <svg {...line}>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m3.5 7 8.5 6 8.5-6" />
        </svg>
    ),
    phone: (
        <svg {...line}>
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
    ),
};

export const channels: Channel[] = [
    { id: "github", name: "GitHub", text: "GitHub/@joaolucasmm", href: links.github },
    { id: "linkedin", name: "LinkedIn", text: "LinkedIn", href: links.linkedin },
    { id: "email", text: links.email, copy: links.email },
    { id: "phone", text: links.phone, copy: links.phone },
];

export interface ToastStatus {
    text: string;
    on: boolean;
}

// Copies a channel's address and shows t.copied[id] for a moment. The text stays
// while the toast fades out, so it never empties mid-fade.
export function useCopy(t: { copied: Record<CopyChannel["id"], string> }) {
    const [status, setStatus] = useState<ToastStatus>({ text: "", on: false });
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = (channel: CopyChannel) => {
        const done = () => {
            setStatus({ text: t.copied[channel.id], on: true });
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setStatus((s) => ({ ...s, on: false })), 2200);
        };
        // Without clipboard access the toast still confirms; the address stays on screen.
        if (navigator.clipboard) navigator.clipboard.writeText(channel.copy).then(done, done);
        else done();
    };

    return [status, copy] as const;
}

export function Toast({ status }: { status: ToastStatus }) {
    return (
        <p className={"toast" + (status.on ? " is-on" : "")} role="status">
            {status.text}
        </p>
    );
}

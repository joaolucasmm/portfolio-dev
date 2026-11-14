import { useEffect, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import type { Copy } from "../../content";

interface Props {
    t: Copy["dialog"];
    emailDialog: boolean;
    setEmailDialog: (open: boolean) => void;
}

const EmailDialog = ({ t, emailDialog, setEmailDialog }: Props) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState<string | null>(null);

    useEffect(() => {
        const el = dialog.current;
        if (!el || typeof el.showModal !== "function") return;
        if (emailDialog && !el.open) el.showModal();
        if (!emailDialog && el.open) el.close();
    }, [emailDialog]);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsSubmitting(true);
        emailjs
            .sendForm(
                import.meta.env.REACT_APP_SERVICE_ID,
                import.meta.env.REACT_APP_TEMPLATE_ID,
                form,
                import.meta.env.REACT_APP_PUBLIC_KEY
            )
            .then(
                () => {
                    setStateMessage(t.sent);
                    form.reset();
                },
                () => setStateMessage(t.error)
            )
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setStateMessage(null), 6000);
            });
    };

    return (
        <dialog
            ref={dialog}
            className="email-dialog"
            aria-labelledby="email-dialog-title"
            onClose={() => setEmailDialog(false)}
            onClick={(e) => e.target === dialog.current && setEmailDialog(false)}
        >
            <div className="email-dialog__inner">
                <div className="email-dialog__head">
                    <h2 id="email-dialog-title">{t.title}</h2>
                    <button type="button" className="text-link" onClick={() => setEmailDialog(false)}>
                        {t.close}
                    </button>
                </div>
                <p className="soft">{t.sub}</p>
                <form onSubmit={sendEmail} className="email-dialog__form">
                    <label>
                        {t.name}
                        <input name="name" autoComplete="name" required />
                    </label>
                    <label>
                        {t.email}
                        <input name="email" type="email" autoComplete="email" spellCheck={false} required />
                    </label>
                    <label className="email-dialog__wide">
                        {t.subject}
                        <input name="title" autoComplete="off" />
                    </label>
                    <label className="email-dialog__wide">
                        {t.message}
                        <textarea name="message" rows={6} required />
                    </label>
                    <div className="email-dialog__wide email-dialog__send">
                        <button type="submit" className="button" disabled={isSubmitting}>
                            {isSubmitting ? t.sending : t.send}
                        </button>
                        <p role="status">{stateMessage}</p>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EmailDialog;

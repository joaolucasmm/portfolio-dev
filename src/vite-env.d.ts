/// <reference types="vite/client" />

// The EmailJS keys, set in the Actions secrets (envPrefix in vite.config.ts).
interface ImportMetaEnv {
    readonly REACT_APP_SERVICE_ID: string;
    readonly REACT_APP_TEMPLATE_ID: string;
    readonly REACT_APP_PUBLIC_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

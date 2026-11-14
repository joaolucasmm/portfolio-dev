/// <reference types="vite/client" />

// The EmailJS keys, set in the Actions secrets (envPrefix in vite.config.mts).
interface ImportMetaEnv {
    readonly REACT_APP_SERVICE_ID: string;
    readonly REACT_APP_TEMPLATE_ID: string;
    readonly REACT_APP_PUBLIC_KEY: string;
}

/** The month of the build, "YYYY-MM" (define in vite.config.mts). */
declare const __BUILD_MONTH__: string;

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

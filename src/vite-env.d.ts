/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_SITE_URL?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

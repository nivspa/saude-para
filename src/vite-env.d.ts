/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string
    readonly VITE_GOOGLE_MAPS_API_KEY: string
    // mais variáveis de ambiente...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

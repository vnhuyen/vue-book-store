/// <reference types="vite/client" />
//import { ExternalProvider } from "@ethersproject/providers";

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_EMAIL: string
  readonly VITE_APP_PASSWORD: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
  }
}
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), new NodePolyfillPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

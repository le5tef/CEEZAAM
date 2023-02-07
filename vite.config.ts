import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { makeEnvMetaTagString } from './src/utils/makeEnvMetaTagString'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import envToHtml from './plugins/envToHtml'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const IS_LOCAL = process.env.SZ_STAND === 'local'
const resolve = (p: string) => path.resolve(__dirname, p)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('element-plus')) {
            return 'element_plus'
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    envToHtml('<!--prql-env-meta-->', makeEnvMetaTagString()),
    pluginRewriteAll(),
    splitVendorChunkPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import '${resolve('src/styles/tools.styl')}'`,
      },
    },
  },
  server: {
    host: 'local.dev13.ru',
    port: 443,
    strictPort: true,
    force: true,
    https: IS_LOCAL && {
      key: fs.readFileSync(resolve('cert/local.key')),
      cert: fs.readFileSync(resolve('cert/local.crt')),
    },
  },
})

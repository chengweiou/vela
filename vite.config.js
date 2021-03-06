import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, './src/i18n/**'),
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.join(__dirname, 'src') },
    ],
  },
})

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [react()],
  base: loadEnv(mode, process.cwd()).VITE_BASE ?? '/',
  server: {
    port: Number(loadEnv(mode, process.cwd()).VITE_DEV ?? 81)
  },
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, './src')}/`,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/theme.scss" as *; @use "@/assets/styles/global.scss" as *;`
      }
    }
  }
})

import vue from '@vitejs/plugin-vue'
import type { UserConfig } from 'vite'
import { loadEnv } from './build/utils'
// import eslintPlugin from 'vite-plugin-eslint'

const { VITE_PORT, VITE_OPEN, VITE_PUBLIC_PATH } = loadEnv()

// @ts-ignore
const viteConfig: UserConfig = {
  // plugins: [vue(), eslintPlugin()],
  plugins: [vue()],
  root: process.cwd(),
  resolve: {
    alias: [
      {
        find: /^\/@\//,
        replacement: '/src/'
      }
    ]
  },
  base: process.env.NODE_ENV === 'production' ? VITE_PUBLIC_PATH : './',
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn']
  },
  server: {
    port: VITE_PORT,
    open: process.env.NODE_ENV !== 'production' ? true : VITE_OPEN,
    proxy: {
      '/gitee': {
        target: 'https://gitee.com',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gitee/, '')
      },
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    // target: 'es2018',
    minify: 'terser',
    sourcemap: false
  }
}

export default viteConfig

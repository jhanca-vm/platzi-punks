import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  define: { global: 'globalThis' },
  plugins: [react()],
  resolve: { alias: { process: 'process/browser', util: 'util' } },
  server: { host: true, port: 3000 },
  preview: { host: true, port: 8000 }
})

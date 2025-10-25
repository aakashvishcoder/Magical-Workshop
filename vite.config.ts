import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  { name: 'svg', enforce: 'pre', transform(code, id) {
    if (id.endsWith('.svg')) {
      return `export default ${JSON.stringify(code)};`;
    }
  }}],
})

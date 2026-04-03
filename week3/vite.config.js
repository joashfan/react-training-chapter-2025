import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 這樣打包後的路徑才會變成相對路徑
  plugins: [react()],
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    // 請把 './' 換成你真實的 GitHub 儲存庫名稱
  base: './',
  plugins: [react()],
  server: {
    open: true, // 加這一行，run dev才會自動開網頁
  },
});
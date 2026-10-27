import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'birthday-surprise' with your EXACT GitHub repository name!
export default defineConfig({
  plugins: [react()],
  base: '/Special01/', 
})
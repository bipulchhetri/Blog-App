import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://blog-app-ro4q-git-main-bipulchhetri80gmailcoms-projects.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


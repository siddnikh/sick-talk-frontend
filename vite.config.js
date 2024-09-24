import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SICKTALK',
        short_name: 'sicktalk',
        description: 'Ain\'t other place to talk than this.',
        theme_color: '#FDB1D7',
        icons: [
          {
            src: 'logo.png',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})

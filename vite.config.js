import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const temporaryRoute = {
  name: 'temporary-route',
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === '/temporary' || request.url === '/temporary/') {
        request.url = '/temporary/index.html'
      } else if (request.url === '/temporary2' || request.url === '/temporary2/') {
        request.url = '/temporary2/index.html'
      }

      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [temporaryRoute, react()],
  build: {
    rollupOptions: {
      input: {
        landing: 'index.html',
        temporary: 'temporary/index.html',
        temporary2: 'temporary2/index.html',
      },
    },
  },
})

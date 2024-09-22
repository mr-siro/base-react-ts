import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = 3003;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@Common': '/src/Common',
      '@Components': '/src/Components',
      '@Pages': '/src/Pages',
      '@Hooks': '/src/Hooks',
      '@App': 'src/App',
      '@Proxies': 'src/Proxies',
      '@Types': 'src/Types',
    },
},
server: { port: PORT, host: true },
preview: { port: PORT, host: true },
})

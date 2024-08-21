import { defineConfig } from 'vite'
import { getConfig } from './configuration/vite/config'

const projectRoot = __dirname

// https://vitejs.dev/config/
export default defineConfig(getConfig({
  paths: {
    projectRoot,
    outDir: 'out'
  }
}))

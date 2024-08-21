import { UserConfig } from "vite"
import { BuildingOptions } from "./types"

// eslint-disable-next-line no-empty-pattern
export function getCss({}: BuildingOptions): UserConfig['css'] {
  return {
    modules: {
      exportGlobals: true,
      generateScopedName: "[name]_[local]__[hash:base64:5]"
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
}
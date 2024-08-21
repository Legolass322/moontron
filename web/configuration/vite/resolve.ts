/**
 * Double check with tsconfig.app.json
 */

import path from 'path'
import { UserConfig } from "vite"
import { BuildingOptions } from './types'

const aliases = {
  '@': 'src',
  'client': 'src/client',
}

export function getResolve({paths}: BuildingOptions): UserConfig['resolve'] {
  return {
    alias: Object.entries(aliases).map(([name, aliasPath]) => ({
      find: `${name}`,
      replacement: path.resolve(paths.projectRoot, aliasPath)
    }))
  }
}
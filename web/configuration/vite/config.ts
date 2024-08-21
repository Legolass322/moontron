import react from '@vitejs/plugin-react'

import { UserConfigFn } from "vite"
import { getResolve } from './resolve'
import { getBuild } from './build'
import { getCss } from './css'
import { BuildingOptions, Paths } from './types'

type GetConigOptions = {
  paths: Paths
}

export function getConfig({paths}: GetConigOptions): UserConfigFn {
  return ({mode: viteMode}) => { 
   
    const mode = viteMode === 'production' ? 'production' : 'development'
    
    const options: BuildingOptions = {
      paths,
      mode,
      isDevMode: mode === 'development',
      isProdMode: mode === 'production',
    }

    return {
      plugins: [react()],
      resolve: getResolve(options),
      build: getBuild(options),
      css: getCss(options),
    }
  }
}
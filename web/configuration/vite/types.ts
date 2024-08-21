type Mode = 'production' | 'development'

export type Paths = {
  projectRoot: string
  outDir: string
}

export type BuildingOptions = {
  paths: Paths
  mode: Mode
  isDevMode: boolean
  isProdMode: boolean
}

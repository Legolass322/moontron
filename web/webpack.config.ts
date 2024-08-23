import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from "./tools/webpack/build"
import { BuildMode, BuildPaths, BuildPlatform } from "./tools/webpack/types"


interface EnvVariables {
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'out'),
    entry: path.resolve(__dirname, 'src', 'client', 'main.tsx'),
    html: path.resolve(__dirname, 'src', 'client', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    root: __dirname,
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 5000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  })

  return config;
}
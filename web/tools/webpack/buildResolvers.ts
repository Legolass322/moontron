import {Configuration} from "webpack";
import {BuildOptions} from "./types";
import path from "path";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.root,
            'client': path.resolve(options.paths.src, 'client'),
            'utls': path.resolve(options.paths.src, 'utils'),
        },
    }
}
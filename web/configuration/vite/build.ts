import { UserConfig } from "vite";
import { BuildingOptions } from "./types";

export function getBuild({paths}: BuildingOptions): UserConfig["build"] {
  return {
    outDir: paths.outDir,
    emptyOutDir: true
  }
}

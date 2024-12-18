import run from "@allwagelab/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

run({
  pkg,
});

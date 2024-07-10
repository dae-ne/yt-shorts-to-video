import * as esbuild from 'esbuild';
import { resolveFilePath } from './utils.mjs';

await esbuild.build({
  entryPoints: [resolveFilePath('extension', 'background.ts')],
  outfile: resolveFilePath('dist', 'background.js'),
  bundle: true,
  minify: true,
});

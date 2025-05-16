import path from 'path';
import { fileURLToPath } from 'url';

function isCommonJSDirectRun(): boolean {
  return typeof require !== 'undefined' &&
    require.main === module;
}

function isESMDirectRun(): boolean {
  try {
    // Delay access to import.meta to runtime only
    // @ts-ignore: Safe in ESM, ignored in CJS
    const meta = import.meta;
    if (!meta?.url) return false;

    const thisFile = fileURLToPath(meta.url);
    const mainScript = path.resolve(process.argv[1] ?? "");
    return thisFile === mainScript;
  } catch {
    return false;
  }
}

export function isDirectRun(): boolean {
  return isCommonJSDirectRun() || isESMDirectRun();
}

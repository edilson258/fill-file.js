import path from "path";
import { fileURLToPath } from "url";

/**
 * Determines if the current module is being run directly (vs imported).
 * Works in both CommonJS and ESM environments.
 */
export function isDirectRun(): boolean {
  // CommonJS check (require.main === module)
  const isCommonJSDirectRun =
    typeof require !== 'undefined' &&
    require.main === module;

  // ESM check (import.meta.url matches process.argv[1])
  const isESMDirectRun =
    typeof import.meta !== 'undefined' &&
    import.meta.url &&
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1] ?? "");

  return !!(isCommonJSDirectRun || isESMDirectRun);
}

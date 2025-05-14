import { DefaultFileSizeInBytes } from "./constants"

type SizeSuffix = "B" | "K" | "M" | "G"

const SizeSuffixMap: Record<SizeSuffix, number> = {
  "B": 1,
  "K": 1 * 1024,
  "M": 1 * 1024 * 1024,
  "G": 1 * 1024 * 1024 * 1024,
}

export function parseFileSizeToBytes(input: string): number {
  input = input.trim()
  if (input.length == 0) return DefaultFileSizeInBytes

  // expect one of: B, K, M, G
  const suffixChar = input[input.length - 1]!.toUpperCase()
  const [suffix, hasValidSuffix] = suffixChar in SizeSuffixMap
    ? [suffixChar as SizeSuffix, true]
    : ["B" as SizeSuffix, false]

  if (!hasValidSuffix) {
    console.log("Invalid size suffix, defaulting to B (bytes)")
  }

  const size = hasValidSuffix ? parseFloat(input.slice(0, -1)) : parseFloat(input);

  if (isNaN(size)) {
    console.log("Invalid size format, defaulting to 1K")
    return DefaultFileSizeInBytes;
  }

  const sizeSuffixMultiplier = SizeSuffixMap[suffix];
  return (size * sizeSuffixMultiplier);
}

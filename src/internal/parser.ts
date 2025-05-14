import { DefaultFileSizeInBytes } from "./consts"

type SizeUnit = "B" | "K" | "M" | "G"

const SizeUnitMap = {
  "B": 1,
  "K": 1 * 1024,
  "M": 1 * 1024 * 1024,
  "G": 1 * 1024 * 1024 * 1024,
}

export function parseFileSizeToBytes(size: string): number {
  size = size.trim()
  if (size.length == 0) return DefaultFileSizeInBytes

  // expect one of: B, K, M, G
  const sizeUnitDigit = size[size.length - 1]!.toUpperCase()

  return 0
}

export const FileFormats = ["txt", "bin"] as const;
export type FileFormat = typeof FileFormats[number];

export interface ParsedArgs {
  output: string
  format: FileFormat
  sizeInBytes: number
}

export interface FileArgs {
  /**
    Must have one of suffixes `B`, `K`, `M`, `G` like `10K` or `24M`
  */
  size: string,

  /**
    Must be either `txt` or `bin`
  */
  format: "txt" | "bin",

  /**
    Refer to the output file name
  */
  output: string,
};

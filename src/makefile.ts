type FileFormat = "text" | "bin"

interface MakeFileOptions {
  size: string
  format: FileFormat
  output: string
}

export default async function MakeFile(options: MakeFileOptions) {
}

MakeFile({ format: "bin", output: "out.bin", size: "1M" })

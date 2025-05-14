import { join } from "node:path";
import { createWriteStream } from "node:fs";

import { TextStream } from "@/src/fill-file-text";
import { type CmdArgs } from "@/src/internal/args-parser";
import { parseFileSizeToBytes } from "@/src/internal/size-parser";

type FileFormat = "txt" | "bin"

const FileFormatStreamMap: Record<FileFormat, typeof TextStream> = {
  "txt": TextStream,
  "bin": TextStream,
};

interface MakeFileOptions {
  size: number
  format: FileFormat
  output: string
}

export function fillFileFromCmdArgs(args: CmdArgs) {
  let format = args.format in FileFormatStreamMap ? args.format as FileFormat : "txt";
  let Stream = FileFormatStreamMap[format];
  let inputStream = new Stream(parseFileSizeToBytes(args.size))
  const outputStream = createWriteStream(args.output)
  inputStream.pipe(outputStream);
}

// export default function MakeFile(options: MakeFileOptions) {
// }

// const nBytes = 1024 * 10; // 10KB
// const outputFile = "output.txt";

// const stream = new TextStream(nBytes);
// const file = createWriteStream(outputFile);

// stream.pipe(file).on("finish", () => {
//   console.log(`✅ Generated ${nBytes} bytes of lorem ipsum at ${outputFile}`);
// });

// MakeFile({ format: "bin", output: "out.bin", size: 1024 })

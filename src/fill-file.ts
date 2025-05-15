import { once } from "node:stream";
import { createWriteStream } from "node:fs";

import type { FileArgs, ParsedArgs } from "@/src/internal/shared"
import { BinaryStream, TextStream } from "@/src/internal/stream";
import { parseArgs, parseCmdArgs } from "@/src/internal/parser";

export async function generateFile(output: string, options: Omit<FileArgs, "output">) {
  return await generate(parseArgs({ format: options.format, size: options.size, output }));
}

export async function generateFileCmd() {
  return await generate(parseCmdArgs());
}

async function generate(args: ParsedArgs): Promise<void> {
  let Stream = args.format == "txt" ? TextStream : BinaryStream;
  let inputStream = new Stream(args.sizeInBytes);
  const outputStream = createWriteStream(args.output);

  inputStream.pipe(outputStream);

  await Promise.race([
    once(outputStream, 'error').then((err) => { throw err; }),
    once(outputStream, 'finish').then(() => console.log("Finished")),
  ]);
}

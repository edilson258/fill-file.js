import yargs from 'yargs';

import { FileFormats } from './shared';
import type { FileArgs, FileFormat, ParsedArgs } from './shared';
import { DefaultFileSizeInBytes } from "./consts"

type SizeSuffix = "B" | "K" | "M" | "G"

const SizeSuffixMap: Record<SizeSuffix, number> = {
  "B": 1,
  "K": 1 * 1024,
  "M": 1 * 1024 * 1024,
  "G": 1 * 1024 * 1024 * 1024,
}

export function parseArgs(args: FileArgs): ParsedArgs {
  return {
    output: args.output,
    format: processArgFormat(args.format),
    sizeInBytes: processArgSize(args.size),
  }
}

export function parseCmdArgs(): ParsedArgs {
  return parseArgs(collectCmdArgs());
}

function processArgSize(input: string): number {
  return parseFileSizeToBytes(input);
}

function processArgFormat(input: string): FileFormat {
  input = input.toLowerCase();
  return FileFormats.includes(input as FileFormat) ? input as FileFormat : "txt";
}

function collectCmdArgs(): FileArgs {
  const argv = yargs(process.argv.slice(2))
    .wrap(120)
    .usage('Usage: $0 <output> [options]')
    .command("$0 <output>", "Create new file", (yargs) => {
      yargs.positional('output', {
        type: 'string',
        demandOption: true,
      })
    }).fail((err) => {
      console.error("Must provide output file name, run with --help");
      process.exit(1);
    })
    .option('s', {
      alias: 'size',
      default: '1K',
      description: 'File size, which can be B, K, M, or G',
    })
    .option('f', {
      alias: 'format',
      default: 'txt',
      description: 'File format, which can be txt or bin',
    })
    .option('h', {
      alias: 'help',
      description: 'Display help message',
    })
    .help('help')
    .version('v', 'Display version information', '0.1.0')
    .alias('version', 'v')
    .example('$0 file.txt -s 1M -t txt', 'Creates a lorem ipsum text file with 1MB size')
    .epilog('For more information visit https://github.com/edilson258/makefile')
    .showHelpOnFail(false, 'Something went wrong! run with --help')
    .parse();

  return argv as unknown as FileArgs;
}

function parseFileSizeToBytes(input: string): number {
  input = input.trim();
  if (input.length == 0) return DefaultFileSizeInBytes;

  // expect one of: B, K, M, G
  const suffixChar = input[input.length - 1]!.toUpperCase();
  const [suffix, hasValidSuffix] = suffixChar in SizeSuffixMap
    ? [suffixChar as SizeSuffix, true]
    : ["K" as SizeSuffix, false];

  const size = hasValidSuffix ? parseFloat(input.slice(0, -1)) : parseFloat(input);

  if (isNaN(size)) {
    return DefaultFileSizeInBytes;
  }

  const sizeSuffixMultiplier = SizeSuffixMap[suffix];
  return (size * sizeSuffixMultiplier);
}

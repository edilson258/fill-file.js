import yargs from 'yargs';

export type CmdArgs = {
  size: string;
  format: string;
  output: string;
};

export function parseCmdArgs(): CmdArgs {
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
    .option('t', {
      alias: 'type',
      default: 'txt',
      description: 'File type, which can be txt, bin, or json',
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

  return argv as unknown as CmdArgs;
}

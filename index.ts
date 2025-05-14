import { parseCmdArgs } from "@/src/internal/args-parser";
import { parseFileSizeToBytes } from "@/src/internal/size-parser";

const args = parseCmdArgs();

console.log(args.output)
console.log(parseFileSizeToBytes(args.size))

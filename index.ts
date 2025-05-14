import { parseCmdArgs } from "@/src/internal/args-parser";
import { parseFileSizeToBytes } from "@/src/internal/size-parser";
import { isDirectRun } from "./src/internal/utilities";
import { fillFileFromCmdArgs } from "./src/fill-file";

if (isDirectRun()) {
  fillFileFromCmdArgs(parseCmdArgs())
}

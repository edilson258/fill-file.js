import { generateFileCmd } from "@/src/fill-file"
import { isDirectRun } from "@/src/internal/utilities";

if (isDirectRun()) {
  generateFileCmd();
}

export { generateFile as default } from '@/src/fill-file';

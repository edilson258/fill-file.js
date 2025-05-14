import { LoremIpsum } from "lorem-ipsum";
import { Readable } from "stream";
import { EOL } from "os";

export class TextStream extends Readable {
  private lorem: LoremIpsum;
  private bytesRemaining: number;

  constructor(sizeInBytes: number) {
    super();
    this.lorem = new LoremIpsum();
    this.bytesRemaining = sizeInBytes;
  }

  _read(size: number) {
    if (this.bytesRemaining <= 0) {
      this.push(null); // End stream
      return;
    }

    // Generate some lorem text
    const chunk = this.lorem.generateParagraphs(1) + EOL;
    const buffer = Buffer.from(chunk, "utf-8");

    const toPush = buffer.subarray(0, Math.min(buffer.length, this.bytesRemaining));
    this.bytesRemaining -= toPush.length;

    this.push(toPush);
  }
}

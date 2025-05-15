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
};

export class BinaryStream extends Readable {
  private chunkSize = 64 * 1024; // 64KB
  private fillByte: number;
  private bytesRemaining: number;

  constructor(sizeInBytes: number, fillByte: number = 0) {
    super();
    this.fillByte = fillByte;
    this.bytesRemaining = sizeInBytes;
  }

  _read(size: number) {
    if (this.bytesRemaining <= 0) {
      this.push(null); // End stream
      return;
    }

    const chunk = Buffer.alloc(this.chunkSize);
    const toPush = chunk.subarray(0, Math.min(chunk.length, this.bytesRemaining));
    this.bytesRemaining -= toPush.length;

    toPush.fill(this.fillByte);

    this.push(toPush);
  }
};

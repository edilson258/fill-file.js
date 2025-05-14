## Fill File

A goto tool for generating files of a specified size and format with an easy-to-use interface.

## Usage

1. generate files from the command line

```shell
npx fill-file output.txt -s 1K -f txt # generate a text file of 1KB
```

2. generate files programmatically

```shell
npm i fill-file
```

```typescript
import { generateFile } from 'fill-file';

await generateFile('output.txt', { size: '1K', format: 'txt' });
```

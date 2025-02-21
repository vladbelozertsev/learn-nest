import * as fs from 'fs';
import { finished } from 'stream/promises';
import { join } from 'node:path';
import { v4 } from 'uuid';

export const uploadFileStream = async (file) => {
  const path = join(__dirname, file.filename);
  const writeStream = fs.createWriteStream(path);
  const readStream = file.createReadStream();

  writeStream.on('drain', () => {
    console.log('drain called');
    readStream.resume();
  });

  readStream.on('data', (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  readStream.on('end', () => {
    // readStream.close();
  });

  // const { createReadStream, filename, mimetype, encoding } = file;
  // const path = join(__dirname, filename);

  // console.log(path);

  // return new Promise((res) => createReadStream().pipe(createWriteStream(path)).on('close', res));
};

// const filename = v4();
// const path = join(__dirname, 'asd');
// // Write Additional Logic if the directory not exists

// const readStream = file.createReadStream();
// const writeStream = createWriteStream(path);
// readStream.pipe(writeStream);
// try {
//   await finished(writeStream);
//   return filename;
// } catch (error: any) {
//   return { error: { error } };
// }

/**
 * Useful links:
 * https://stackoverflow.com/questions/75744174/how-to-upload-images-in-nestjs-with-graphql
 **/

import { FileUpload } from 'graphql-upload-ts';
import { createWriteStream } from 'node:fs';
import { finished } from 'stream/promises';
import { randomBytes } from 'crypto';
import { join } from 'node:path';

type Prams = {
  files?: [Promise<FileUpload>];
  dir: 'public' | 'private';
};

export const saveFiles = async (prams: Prams) => {
  if (!prams.files) return;
  try {
    const data = await Promise.allSettled(prams.files);
    const files = data.filter((v) => v.status === 'fulfilled').map((v) => v.value);
    return Promise.allSettled(
      files.map((file) => {
        const now = Math.round(Date.now() / 1000);
        const name = randomBytes(7).toString('hex');
        const ext = file.filename.split('.')[1];
        const savedAs = `${now}-${name}.${ext}`;
        const readStream = file.createReadStream();
        const path = join(__dirname, '..', '..', '..', '..', prams.dir);
        const writeStream = createWriteStream(`${path}/${savedAs}`);
        readStream.pipe(writeStream);
        return finished(writeStream).then(() => ({ file, savedAs }));
      }),
    );
  } catch (err: unknown) {
    console.error(err);
    return { succes: false, err };
  }
};

/**
 * Useful links:
 * https://stackoverflow.com/questions/75744174/how-to-upload-images-in-nestjs-with-graphql
 **/

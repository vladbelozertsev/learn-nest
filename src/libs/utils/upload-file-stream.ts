import { createWriteStream } from 'node:fs';
import { finished } from 'stream/promises';
import { join } from 'node:path';
import { v4 } from 'uuid';

export const uploadFileStream = async (file) => {
  const filename = v4();
  const path = join(__dirname, 'asd');
  // Write Additional Logic if the directory not exists

  const readStream = file.createReadStream();
  const writeStream = createWriteStream(path);
  readStream.pipe(writeStream);
  try {
    await finished(writeStream);
    return filename;
  } catch (error: any) {
    return { error: { error } };
  }
};

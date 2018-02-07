import fs from 'fs';

import { tableOfContents, template } from './template';

export default function ({ args, data }) {
  return new Promise((resolve, reject) => {
    // write to dest stream
    let writeStream;
    try {
      writeStream = fs.createWriteStream(args.dest, { flags: 'w' });
    } catch (err) {
      reject(err);
    }
    writeStream.on('error', (err) => {
      reject(err);
    });
    writeStream.on('finish', () => {
      resolve();
    });
    // build the table of contents
    if (!args.notoc) {
      data.forEach((contract) => {
        writeStream.write(tableOfContents(contract));
      });
      writeStream.write('\n');
    }

    // create docs for each contract from template
    data.forEach((contract) => {
      const md = template(contract);
      writeStream.write(md);
    });

    writeStream.end();
  });
}

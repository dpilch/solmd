import fs from 'fs';

import template from './template';

export default function ({ args, data }) {
  const writeStream = fs.createWriteStream(args.dest, { flags: 'w' });
  return new Promise((resolve) => {
    data.forEach((contract) => {
      const md = template(contract);
      writeStream.write(md);
    });
    resolve(writeStream.end());
  });
}

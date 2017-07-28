import fs from 'fs';

import compile from './compile';
import markdown from './markdown';

export default function (args) {
  compile(args).then((data) => {
    markdown({ args, data }).then((md) => {
      const output = `${process.env.PWD}/${args.target}`;
      return fs.writeFileSync(`${output}`, `${JSON.stringify(md)}\n`);
    });
  });
}

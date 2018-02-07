import fs from 'fs';
import parseAbi from './parse-abi';
import solc from './solc';

function compile({ contracts }) {
  const data = [];
  Object.keys(contracts).forEach((contractName) => {
    const contract = contracts[contractName];
    const { fileName } = contract;
    const { devdoc } = contract;
    const { author, title } = devdoc;
    data.push({
      author,
      title,
      fileName: fileName.replace(process.env.PWD, ''),
      name: contractName,
      abiDocs: parseAbi(contract),
    });
  });

  return data;
}

export default function (opts) {
  opts._.split(' ').forEach((file) => {
    if (!fs.existsSync(file)) {
      process.stderr.write(`${file}: No such file or directory
`);
      process.exit(1);
    }
  });
  return solc(opts._)
    .then(({ contracts }) => (
      compile({ ...opts, contracts })
    ))
    .catch(() => {
      console.error(`solmd: Failed to compile contracts at ${opts._}`); // eslint-disable-line no-console
      process.exit(1);
    });
}

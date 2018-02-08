import childProcess from 'child_process';
import path from 'path';

export default function (src) {
  return new Promise((resolve) => {
    const exec = `solc --allow-paths ./,../, --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc ${src}`;
    const rawRes = childProcess.execSync(exec);
    const res = JSON.parse(rawRes);
    resolve({
      contracts: Object.keys(res.contracts).reduce((o, k) => {
        const [contractFile, contractName] = k.split(':');

        if (path.resolve(contractFile) !== path.resolve(src)) {
          return o;
        }

        const contract = res.contracts[k];
        return {
          ...o,
          [contractName]: {
            ...contract,
            abi: JSON.parse(contract.abi),
            devdoc: JSON.parse(contract.devdoc),
            userdoc: JSON.parse(contract.userdoc),
          },
        };
      }, {}),
    });
  });
}

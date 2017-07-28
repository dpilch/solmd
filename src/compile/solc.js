import childProcess from 'child_process';

export default function (src) {
  return new Promise((resolve) => {
    const exec = `solc --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc ${src}`;
    const res = JSON.parse(childProcess.execSync(exec));
    resolve({
      contracts: Object.keys(res.contracts).reduce((o, k) => {
        const file = k.split(':')[0];
        const fileFragments = file.split('/');
        const contractName = fileFragments[fileFragments.length - 1].split('.sol')[0];
        const contract = res.contracts[k];
        const fileName = `${process.env.PWD}/${k.split(':')[0]}`;
        return {
          ...o,
          [contractName]: {
            ...contract,
            fileName,
            abi: JSON.parse(contract.abi),
            devdoc: JSON.parse(contract.devdoc),
            userdoc: JSON.parse(contract.userdoc),
          },
        };
      }, {}),
    });
  });
}

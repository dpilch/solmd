import { getFunctionSignature, getEventTopic } from '../helpers';

export default function (contract) {
  return contract.abi.map((method) => {
    const inputParams = method.inputs || [];
    const signature = method.name && `${method.name}(${inputParams.map(i => i.type).join(',')})`;
    const devDocs = (contract.devdoc.methods || {})[signature] || {};
    const userDocs = (contract.userdoc.methods || {})[signature] || {};
    // map abi inputs to devdoc inputs
    const params = devDocs.params || {};
    const inputs = inputParams.map(param => ({ ...param, description: params[param.name] }));
    const argumentList = inputParams.reduce((inputString, param) => `${inputString}${param.name}, `, '').slice(0, -2);
    // don't write this
    delete devDocs.params;

    let outputs = method.outputs || []; // eslint-disable-line prefer-destructuring;
    try {
      if (typeof devDocs.return !== 'undefined') {
        const outputParams = JSON.parse(devDocs.return);
        outputs = method.outputs.map(param => (
          { ...param, description: outputParams[param.name] }
        ));
      }
    } catch (e) {
      if (typeof devDocs.return === 'string' && method.outputs.length === 1) {
        outputs = method.outputs.map(param => (
          { ...param, description: devDocs.return }
        ));
      } else {
        process.stderr.write(`warning: invalid @return for ${method.name} - output may be affected\n`);
      }
    }

    return {
      ...method,
      ...devDocs,
      ...userDocs,
      inputs,
      argumentList,
      outputs,
      signature,
      signatureHash: signature && (method.type === 'function' ? getFunctionSignature(signature) : getEventTopic(signature)),
    };
  });
}

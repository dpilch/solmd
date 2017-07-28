import DEFAULT_DEST from './constants';
import build from './build';

const methods = {
  build,
};

function populateArguments(passed) {
  const modified = passed;
  modified._ = modified._.join(' ');

  const defaults = {
    dest: DEFAULT_DEST,
  };

  return { ...defaults, ...modified };
}

const wrappedMethods = {};
Object.keys(methods).forEach((key) => {
  wrappedMethods[key] = (args) => {
    const newArgs = populateArguments(args);
    return methods[key](newArgs);
  };
});

export default wrappedMethods;

import {
  DEFAULT_SRC_DIR,
  DEFAULT_TARGET,
  DEFAULT_TMP_DIR,
} from './constants';

import compile from './compile';

const methods = {
  compile,
};

function populateArguments(passed) {
  // cruft from minimist
  delete passed._; // eslint-disable-line no-param-reassign
  // fallback to defaults
  const defaults = {
    target: DEFAULT_TARGET,
    src: DEFAULT_SRC_DIR,
    tmp: DEFAULT_TMP_DIR,
  };
  // return merge
  return { ...defaults, ...passed };
}
// wire up defaults
const wrappedMethods = {};
Object.keys(methods).forEach((key) => {
  wrappedMethods[key] = (args) => {
    const newArgs = populateArguments(args);
    return methods[key](newArgs);
  };
});

export default wrappedMethods;

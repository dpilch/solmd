import {
  DEFAULT_SRC_DIR,
  DEFAULT_TARGET,
  DEFAULT_TMP_DIR,
} from './constants';

import compile from './compile';
import markdown from './markdown';
import build from './build';

const methods = {
  compile,
  markdown,
  build,
};

function populateArguments(passed) {
  delete passed._; // eslint-disable-line no-param-reassign

  const defaults = {
    target: DEFAULT_TARGET,
    src: DEFAULT_SRC_DIR,
    tmp: DEFAULT_TMP_DIR,
  };

  return { ...defaults, ...passed };
}

const wrappedMethods = {};
Object.keys(methods).forEach((key) => {
  wrappedMethods[key] = (args) => {
    const newArgs = populateArguments(args);
    return methods[key](newArgs);
  };
});

export default wrappedMethods;

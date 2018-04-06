import {
  DEFAULT_DEST,
  DEFAULT_NO_TOC,
} from './constants';
import build from './build';

const methods = {
  build,
};

function populateArguments(passed) {
  const defaults = {
    dest: DEFAULT_DEST,
    'no-toc': DEFAULT_NO_TOC,
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

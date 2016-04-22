import { spy } from 'sinon';

// This is intended as a very dumb/simple mock. Not suitable for much real
// testing of interactions with electron, it is reasonably suitable for
// preventing module not found errors though. This gets rewired to electron in
// .babelrc.
export default {
  remote: {
    require: () => {},
    dialog: {
      showOpenDialog: spy(),
      showSaveDialog: spy()
    }
  }
};

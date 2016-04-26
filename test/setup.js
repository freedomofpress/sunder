import 'babel-polyfill';
import { jsdom } from 'jsdom';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

/**
 * jsdom setup
 */
global.document = jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  removeItem(key) {
    this[key] = undefined;
  },
};

/**
 * Get rid of those dirty dirty assertions on property access that chai loves
 * much.
 */
chai.use(dirtyChai);

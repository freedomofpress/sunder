import { remote } from 'electron';
import fs from 'fs';

const DEFAULT_FILENAME_FN = (shareNr) => `secret-share-${shareNr}.txt`;

/**
 * @param   {Buffer}    file                  The file to save
 * @param   {Object}    options
 * @param   {Object}    options.dialogTitle   Title of dialog window
 * @param   {Object}    options.defaultPath   Directory or filename to use by default
 * @param   {Function}  options.shareNr       If no defaultPath is supplied, the share number to generate
 *                                            the filename with
 * @param   {Function}  callback              Called after save action with object { success, message }
 */
export function saveFile(file, options = {}, callback) {
  remote.dialog.showSaveDialog({
    title: options.dialogTitle || 'Save File',
    defaultPath: options.defaultPath || (options.shareNr ? DEFAULT_FILENAME_FN(options.shareNr) : undefined),
  }, (filename) => {
    let result;

    if (!filename) {
      return;
    }

    result = writeFile(filename, file);

    callback(result);
  });
}

/**
 * @param   {Array}     files                 Array with files to save
 * @param   {Object}    options
 * @param   {Object}    options.dialogTitle   Title of dialog window
 * @param   {Object}    options.defaultPath   Directory to use by default
 * @param   {Function}  options.filenameFn    Function to generate a custom filename, accepts a Number
 *                                            (share number) and returns String
 * @param   {Function}  callback              Called after save action with array of object { success, message }
 */
export function saveFiles(files, options = {}, callback) {
  remote.dialog.showOpenDialog({
    title: options.dialogTitle || 'Save All Files',
    defaultPath: options.defaultPath,
    properties: ['openDirectory', 'createDirectory']
  }, (directory) => {
    let result = [];
    let filenameFn = options.filenameFn || DEFAULT_FILENAME_FN;

    if (!directory) {
      return;
    }

    files.forEach((file, index) => {
      let filename = `${directory}/${filenameFn(index + 1)}`;
      result[index] = writeFile(filename, file, false);
    });

    callback(result);
  });
}

/**
 * @param   {String}    filename
 * @param   {Buffer}    file
 * @param   {bool}      overwrite             Whether to overwrite file if filename already exists
 * @returns {Object}    Object containing: success {bool} and message {String}
 */
function writeFile(filename, file, overwrite = true)
{
  try {
    fs.writeFileSync(
      filename,
      file,
      { mode: '0600', flag: (overwrite ? 'w' : 'wx') }
    );
    return { success: true, message: filename };
  } catch (error) {
    if (error.code === 'EEXIST')
      return { success: false, message: 'File already exists' };
    else
      return { success: false, message: `Unknown error: ${error.code}` };
  }
}

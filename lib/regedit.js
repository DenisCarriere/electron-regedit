const rootKey = require('./utils').rootKey

// Default Values
const HEADER = 'Windows Registry Editor Version 5.00\r\n\r\n'

/**
 * Build Regedit to Delete Registry Key
 *
 * @private
 * @param {string|string[]} keys Registry Key
 * @param {string|string[]} [subKeys] Will only delete subKey if present
 * @returns {string} Regedit
 */
function deleteKey (keys, subKeys) {
  if (typeof keys === 'string') keys = [keys]
  if (typeof subKeys === 'string') subKeys = [subKeys]
  var reg = HEADER

  keys.forEach(key => {
    key = rootKey(key)
    subKeys.forEach(subKey => {
      if (!subKey) throw new Error('subkey cannot be null or undefined')
      reg += subKey ? `[-${key}\\${subKey}]\r\n` : `[-${key}]\r\n`
    })
  })
  return reg
}

module.exports = {
  deleteKey: deleteKey
}

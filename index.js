const utils = require('./lib/utils')
const regedit = require('./lib/regedit')

/**
 * Promise => Delete Registry Key
 *
 * @param {string|string[]} rootKeys Registry Key
 * @param {string|string[]} subKeys SubKey
 * @returns {Promise<string>} Regedit Text
 */
function deleteKey (rootKeys, subKeys) {
  return utils.writePromise(regedit.deleteKey(rootKeys, subKeys))
}

/**
 * Sync => Delete Registry Key
 *
 * @param {string|string[]} rootKeys Root Registry Key
 * @param {string|string[]} subKeys SubKey
 * @returns {string} Regedit Text
 */
function deleteKeySync (rootKeys, subKeys) {
  return utils.writeSync(regedit.deleteKey(rootKeys, subKeys))
}

// /**
//  * Create Registry Key
//  *
//  * @param {string|string[]} keys Registry Key
//  */
// function createKey (keys, subKey) {
//   if (typeof keys === 'string') keys = [keys]
//   keys.forEach(key => {
//     console.log(key)
//   })
// }

// /**
//  * List Registry Key
//  *
//  * @param {string|string[]} keys Registry Key
//  */
// function list (keys) {
//   if (typeof keys === 'string') keys = [keys]
//   keys.forEach(key => console.log(key))
// }

/**
 * Promise => Set Key Value
 *
 * @param {string} rootKey Root Key ('HKEY_LOCAL_MACHINE')
 * @param {string} subKey Sub Registry key ('SOFTWARE\Application')
 * @param {Object} json JSON Object as Key/Value
 * @returns {Promise<string>} Regedit Text
 */
function setKeyValue (rootKey, subKey, json) {
  return utils.writePromise(regedit.setKeyValue(rootKey, subKey, json))
}

/**
 * Sync => Set Key Value
 *
 * @param {string} rootKey Root Key ('HKEY_LOCAL_MACHINE')
 * @param {string} subKey Sub Registry key ('SOFTWARE\Application')
 * @param {Object} json JSON Object as Key/Value
 * @returns {string} Regedit Text
 */
function setKeyValueSync (rootKey, subKey, json) {
  return utils.writeSync(regedit.setKeyValue(rootKey, subKey, json))
}

module.exports = {
  deleteKey: deleteKey,
  deleteKeySync: deleteKeySync,
  setKeyValue: setKeyValue,
  setKeyValueSync: setKeyValueSync
}

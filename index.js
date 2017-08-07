const utils = require('./lib/utils')
const regedit = require('./lib/regedit')

/**
 * Promise => Delete Registry Key
 *
 * @param {string|string[]} keys Registry Key
 * @param {string|string[]} [subKeys] Will only delete subKey if present
 * @returns {Promise<Object>} Status
 */
function deleteKey (keys, subKeys) {
  return utils.writePromise(regedit.deleteKey(keys, subKeys))
}

/**
 * Sync => Delete Registry Key
 *
 * @param {string|string[]} keys Registry Key
 * @param {string|string[]} [subKeys] Will only delete subKey if present
 * @returns {Object} Status
 */
function deleteKeySync (keys, subKeys) {
  return utils.writeSync(regedit.deleteKey(keys, subKeys))
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

// /**
//  * Set Key Value
//  *
//  * @param {string} key Registry Key ('HKEY_LOCAL_MACHINE', 'HKLM')
//  * @param {string} subKey Sub Registry key
//  * @param {string} value Value
//  * @param {string} [type='REG_SZ'] Registry Type
//  */
// function setKeyValue (key, subKey, value, type) {

// }

module.exports = {
  deleteKey: deleteKey,
  deleteKeySync: deleteKeySync
}

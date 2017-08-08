const utils = require('./utils')
const parseSubKey = utils.parseSubKey
const parseRootKey = utils.parseRootKey

// Default Values
const HEADER = 'Windows Registry Editor Version 5.00\r\n\r\n'

/**
 * Build Regedit to Delete Registry Key
 *
 * @private
 * @param {string|string[]} rootKeys Root Key(s) ('HKEY_LOCAL_MACHINE')
 * @param {string|string[]} subKeys Sub Registry Key(s) ('SOFTWARE\Application')
 * @returns {string} Regedit Text
 */
function deleteKey (rootKeys, subKeys) {
  if (!rootKeys) throw new Error('rootKeys is required')
  if (!subKeys) throw new Error('subKeys is required')
  if (typeof rootKeys === 'string') rootKeys = [rootKeys]
  if (typeof subKeys === 'string') subKeys = [subKeys]

  var reg = HEADER
  rootKeys.forEach(rootKey => {
    rootKey = parseRootKey(rootKey)
    subKeys.forEach(subKey => {
      subKey = parseSubKey(subKey)
      reg += subKey ? `[-${rootKey}\\${subKey}]\r\n` : `[-${rootKey}]\r\n`
    })
  })
  return reg
}

/**
 * Build Regedit to Delete Registry Key
 *
 * @private
 * @param {string} rootKey Root Key ('HKEY_LOCAL_MACHINE')
 * @param {string} subKey Sub Registry key ('SOFTWARE\Application')
 * @param {Object} json JSON Object as Key/Value
 * @returns {string} Regedit Text
 */
function setKeyValue (rootKey, subKey, json) {
  if (!rootKey) throw new Error('rootKey is required')
  if (!subKey) throw new Error('subKey is required')
  if (!json) throw new Error('json is required')
  if (typeof json !== 'object') throw new Error('json must be an Object')
  rootKey = parseRootKey(rootKey)
  subKey = parseSubKey(subKey)

  var reg = HEADER
  reg += subKey ? `[${rootKey}\\${subKey}]\r\n` : `[-${rootKey}]\r\n`
  Object.keys(json).forEach(key => {
    var value = json[key]
    if (typeof value === 'object') value = JSON.stringify(value)
    reg += `"${key}"="${value}"\r\n`
  })
  return reg
}

module.exports = {
  deleteKey: deleteKey,
  setKeyValue: setKeyValue
}

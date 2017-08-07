const os = require('os')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const childProcess = require('child_process')
const mkdirp = require('./mkdirp')
const spawnSync = childProcess.spawnSync
const spawn = childProcess.spawn

// Root Key Mapping
const ROOT_KEYS = new Set([
  'HKEY_CLASSES_ROOT',
  'HKEY_CURRENT_USER',
  'HKEY_LOCAL_MACHINE',
  'HKEY_USERS',
  'HKEY_CURRENT_CONFIG'
])
const ROOT_KEYS_ABREV = new Map([
  ['HKCR', 'HKEY_CLASSES_ROOT'],  // Stores file association and COM object registration
  ['HKCU', 'HKEY_CURRENT_USER'],  // Stores data associated with the account currently logged on
  ['HKLM', 'HKEY_LOCAL_MACHINE'], // Stores system-related information
  ['HKU', 'HKEY_USERS'],          // Stores information about all the accounts on the machine
  ['HKCC', 'HKEY_CURRENT_CONFIG'] // Stores information about the current machine profile
])

/**
 * Handles user input root key
 *
 * @private
 * @param {string} rootkey Registry Key
 * @returns {string} Root Registry Key
 */
function rootKey (rootkey) {
  if (!rootkey) throw new Error('rootkey is required')
  if (ROOT_KEYS_ABREV.has(rootkey)) return ROOT_KEYS_ABREV.get(rootkey)
  if (!ROOT_KEYS.has(rootkey)) throw new Error('rootkey is invalid')
  return rootkey
}

/**
 * Create Message
 *
 * @private
 * @param {string} reg Regedit
 * @param {string} regeditPath Regedit File Path
 * @param {string} method Method name
 * @param {Object} params Method params
 */
function createMessage (reg, regeditPath, method, params) {
  return Object.assign({method: method, regegit: reg, regeditPath: regeditPath}, {params: params})
}

/**
 * Write Regedit
 *
 * @private
 * @param {string} reg Regedit text
 * @param {string} method Method name
 * @param {Object} params Method params
 * @returns {Object} Message
 * @throws {Error} throws Error if Regedit is invalid
 */
function writeSync (reg, method, params) {
  const regeditPath = createTmpRegFile(reg)
  const message = createMessage(reg, regeditPath, method, params)

  // Execute Regedit
  const regedit = spawnSync('regedit', ['/S', regeditPath])
  const error = regedit.error
  const output = regedit.output[1] && regedit.output[1].toString()
  if (error) throw new Error(error)
  if (output) throw new Error(output)
  return message
}

/**
 * Write Regedit
 *
 * @private
 * @param {string} reg Regedit text
 * @param {string} method Method name
 * @param {Object} params Method params
 * @returns {Promise<Object>} Message
 */
function writePromise (reg, method, params) {
  const regeditPath = createTmpRegFile(reg)
  const message = createMessage(reg, regeditPath, method, params)

  return new Promise((resolve, reject) => {
    // Promise Handling
    const error = data => reject(data.toString())
    const success = data => resolve(message)

    // Execute Silent Regedit
    const regedit = spawn('regedit', ['/S', regeditPath])
    regedit.stdout.on('data', error)
    regedit.stderr.on('data', error)
    regedit.on('close', success)
  })
}

/**
 * Create Tempory Regedit file
 *
 * @private
 * @param {string} reg Regedit text
 * @returns {string} regedit filepath location
 */
function createTmpRegFile (reg) {
  const hash = crypto.pseudoRandomBytes(8).toString('hex')
  const filename = `registry-editor-${hash}.reg`
  const filepath = path.join(os.tmpdir(), 'registry-editor', filename)
  mkdirp.sync(path.parse(filepath).dir)
  fs.writeFileSync(filepath, reg)
  return filepath
}

module.exports = {
  writeSync: writeSync,
  writePromise: writePromise,
  createTmpRegFile: createTmpRegFile,
  rootKey: rootKey
}

const fs = require('fs')
const os = require('os')
const path = require('path')
const test = require('tape')
const utils = require('./lib/utils')
const regedit = require('./lib/regedit')
const registryEditor = require('./')

switch (os.platform()) {
  case 'darwin':
  case 'win32':
    test('deleteKey', t => {
      try {
        registryEditor.deleteKeySync('HKLM', ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])
        t.pass('deleteKey -- sync')
      } catch (error) {
        t.fail(error)
      }
      registryEditor.deleteKey('HKLM', ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])
        .then(status => t.pass('deleteKey -- promise'))
        .catch(error => t.fail(error))
      t.end()
    })
}

test('regedit -- deleteKey', t => {
  const reg = regedit.deleteKey('HKLM', ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])
  const output = path.join(__dirname, 'test', 'out', 'deleteKey.reg')
  if (process.env.REGEN) fs.writeFileSync(output, reg)
  t.equal(reg, fs.readFileSync(output, 'utf8'))
  t.end()
})

test('utils -- rootKey', t => {
  t.equal(utils.rootKey('HKEY_LOCAL_MACHINE'), 'HKEY_LOCAL_MACHINE', 'rootKey => HKEY_LOCAL_MACHINE')
  t.equal(utils.rootKey('HKCR'), 'HKEY_CLASSES_ROOT', 'rootKey => HKCR')
  t.equal(utils.rootKey('HKCU'), 'HKEY_CURRENT_USER', 'rootKey => HKCU')
  t.equal(utils.rootKey('HKLM'), 'HKEY_LOCAL_MACHINE', 'rootKey => HKLM')
  t.equal(utils.rootKey('HKU'), 'HKEY_USERS', 'rootKey => HKU')
  t.equal(utils.rootKey('HKCC'), 'HKEY_CURRENT_CONFIG', 'rootKey => HKCC')
  t.throws(() => utils.rootKey('HKxx'), 'rootKey => HKxx')
  t.throws(() => utils.rootKey(undefined), 'rootKey => undefined')
  t.throws(() => utils.rootKey(null), 'rootKey => null')
  t.end()
})

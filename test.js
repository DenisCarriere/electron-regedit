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
    test('setKeyValue', t => {
      try {
        registryEditor.setKeyValueSync('HKLM', 'SOFTWARE\\Bar', {helloSync: 'world'})
        t.pass('setKeyValue -- sync')
      } catch (error) {
        t.fail(error)
      }
      registryEditor.setKeyValue('HKLM', 'SOFTWARE\\Bar', {helloPromise: {foo: 'world'}})
        .then(status => t.pass('setKeyValue -- promise'))
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

test('regedit -- setKeyValue', t => {
  const reg = regedit.setKeyValue('HKLM', 'SOFTWARE\\Foo', {hello: 'world'})
  const output = path.join(__dirname, 'test', 'out', 'setKeyValue.reg')
  if (process.env.REGEN) fs.writeFileSync(output, reg)
  t.equal(reg, fs.readFileSync(output, 'utf8'))
  t.end()
})

test('utils -- parseRootKey', t => {
  t.equal(utils.parseRootKey('HKEY_LOCAL_MACHINE'), 'HKEY_LOCAL_MACHINE', 'parseRootKey => HKEY_LOCAL_MACHINE')
  t.equal(utils.parseRootKey('HKCR'), 'HKEY_CLASSES_ROOT', 'parseRootKey => HKCR')
  t.equal(utils.parseRootKey('HKCU'), 'HKEY_CURRENT_USER', 'parseRootKey => HKCU')
  t.equal(utils.parseRootKey('HKLM'), 'HKEY_LOCAL_MACHINE', 'parseRootKey => HKLM')
  t.equal(utils.parseRootKey('HKU'), 'HKEY_USERS', 'parseRootKey => HKU')
  t.equal(utils.parseRootKey('HKCC'), 'HKEY_CURRENT_CONFIG', 'parseRootKey => HKCC')
  t.throws(() => utils.parseRootKey('HKxx'), 'parseRootKey => HKxx')
  t.throws(() => utils.parseRootKey(undefined), 'parseRootKey => undefined')
  t.throws(() => utils.parseRootKey(null), 'parseRootKey => null')
  t.end()
})

import * as registryEditor from './'

/**
 * Delete Key
 */
registryEditor.deleteKey('HKCR', 'SOFTWARE\\Foo')
  .then(regegit => regegit)
  .catch(error => error)
registryEditor.deleteKey(['HKCR', 'HKCU'], 'SOFTWARE\\Foo')
registryEditor.deleteKey(['HKCR', 'HKCU'], ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])
registryEditor.deleteKeySync('HKCR', 'SOFTWARE\\Foo')
registryEditor.deleteKeySync(['HKCR', 'HKCU'], 'SOFTWARE\\Foo')
registryEditor.deleteKeySync(['HKCR', 'HKCU'], ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])

/**
 * Set Key Value
 */
registryEditor.setValueKey('HKCR', 'SOFTWARE\\Foo', {hello: 'world'})
  .then(regedit => regedit)
  .catch(error => error)
registryEditor.setValueKeySync('HKCR', 'SOFTWARE\\Foo', {hello: 'world'})
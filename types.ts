import {deleteKey, deleteKeySync} from './'

/**
 * Delete Key
 */
deleteKey('HKCR', 'SOFTWARE\\Foo')
  .then(regegit => regegit)
  .catch(error => error)
deleteKey(['HKCR', 'HKCU'], 'SOFTWARE\\Foo')
deleteKey(['HKCR', 'HKCU'], ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])
deleteKeySync('HKCR', 'SOFTWARE\\Foo')
deleteKeySync(['HKCR', 'HKCU'], 'SOFTWARE\\Foo')

const regegit = deleteKeySync(['HKCR', 'HKCU'], ['SOFTWARE\\Foo', 'SOFTWARE\\Bar'])

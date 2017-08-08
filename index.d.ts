export type RootKeys =
  'HKCR' | 'HKEY_CLASSES_ROOT' |
  'HKCU' | 'HKEY_CURRENT_USER' |
  'HKLM' | 'HKEY_LOCAL_MACHINE' |
  'HKU'  | 'HKEY_USERS' |
  'HKCC' | 'HKEY_CURRENT_CONFIG'

export function deleteKey(rootKeys: RootKeys | RootKeys[], subKeys: string | string[]): Promise<string>
export function deleteKeySync(rootKeys: RootKeys | RootKeys[], subKeys: string | string[]): string
export function setValueKey(rootKey: RootKeys, subKey: string, json: any): Promise<string>
export function setValueKeySync(rootKey: RootKeys, subKey: string, json: any): string
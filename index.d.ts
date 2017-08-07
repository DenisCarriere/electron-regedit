export type RootKeys =
  'HKCR' | 'HKEY_CLASSES_ROOT' |
  'HKCU' | 'HKEY_CURRENT_USER' |
  'HKLM' | 'HKEY_LOCAL_MACHINE' |
  'HKU'  | 'HKEY_USERS' |
  'HKCC' | 'HKEY_CURRENT_CONFIG'

export function deleteKey(keys: RootKeys | RootKeys[], subKeys: string | string[]): Promise<string>
export function deleteKeySync(keys: RootKeys | RootKeys[], subKeys: string | string[]): string
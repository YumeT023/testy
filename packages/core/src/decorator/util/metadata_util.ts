export function getMetadata<T>(key: any, target: Function): T {
  const value = findMetadata<T>(key, target);
  if (value == null) {
    throw new Error("metadata with key: '" + key + "' couldn't be retrieved");
  }
  return value;
}

export function findMetadata<T>(key: string, target: Function): T {
  return Reflect.getMetadata(key, target) as T;
}

export function getMetadataOrDefault<T>(key: string, target: Function, defaultValue: T): T {
  return findMetadata(key, target) || defaultValue;
}

export function addValuesToArrayMetadata<T = any>(target: any, key: string, ...values: T[]) {
  const snapshot = getMetadataOrDefault(key, target, []);
  const updatedValues = new Set([...snapshot, ...values]);
  Reflect.defineMetadata(key, Array.from(updatedValues), target);
}

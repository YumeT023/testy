export function defineMetadata(type: any, metadataKey: string, value: any) {
  Object.defineProperty(type, metadataKey, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  });
}

export function getMetadata<T>(type: any, metadataKey: string): T {
  const value = findMetadata<T>(type, metadataKey);
  if (value == null) {
    throw new Error("metadata with key: '" + metadataKey + "' couldn't be retrieved");
  }
  return value;
}

export function findMetadata<T>(type: any, metadataKey: string): T {
  return Object.getOwnPropertyDescriptor(type, metadataKey)?.value as T;
}

export function getMetadataOrDefault<T>(type: any, metadataKey: string, defaultValue: T): T {
  return findMetadata(type, metadataKey) || defaultValue;
}

export function addValuesToArrayMetadata<T = any>(type: any, metadataKey: string, ...values: T[]) {
  const snapshot = getMetadataOrDefault(type, metadataKey, []);
  const updatedValues = new Set([...snapshot, ...values]);
  defineMetadata(type, metadataKey, Array.from(updatedValues));
}

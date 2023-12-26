import {addValuesToArrayMetadata} from "./metadata_util";

export function registerFunDecoratorFactory(metadataKey: string): MethodDecorator {
  return (target, name, _desc) => {
    addValuesToArrayMetadata(target.constructor, metadataKey, name);
  };
}

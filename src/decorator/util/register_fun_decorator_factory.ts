import {addValuesToArrayMetadata} from "./metadata_util";

export function registerFunDecoratorFactory(key: string) {
  return (_: Function, ctx: ClassMethodDecoratorContext) => {
    ctx.addInitializer(function (this: any) {
      addValuesToArrayMetadata(this.constructor, key, ctx.name);
    });
  };
}

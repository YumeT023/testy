import {addValuesToArrayMetadata} from "./metadata_util";

export function makeFunMarkerDecorator(mark: string) {
  return (_: Function, ctx: ClassMethodDecoratorContext) => {
    const name = ctx.name as string;
    ctx.addInitializer(function (this: any) {
      addValuesToArrayMetadata(this.constructor, mark, name);
    });
  };
}

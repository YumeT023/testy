import {TEST_CLASS_DESC, TEST_CLASS_WATERMARK} from "./constants";
import {defineMetadata} from "./util/metadata_util";

interface TestClazzOptions {
  desc: string;
}

export const TestClass = (options: Partial<TestClazzOptions> = {}) => {
  return (ctor: any, ctx: ClassDecoratorContext) => {
    defineMetadata(ctor, TEST_CLASS_WATERMARK, true);
    defineMetadata(ctor, TEST_CLASS_DESC, options.desc || ctx.name);
  };
};

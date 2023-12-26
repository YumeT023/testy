import {TEST_CLASS_DESC, TEST_CLASS_WATERMARK} from "./constants";

interface TestClazzOptions {
  desc: string;
}

export const TestClass = (options: Partial<TestClazzOptions> = {}): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(TEST_CLASS_WATERMARK, true, target);
    Reflect.defineMetadata(TEST_CLASS_DESC, options.desc || target.name, target);
  };
};

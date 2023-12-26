import {
  TEST_SUITE_SKIP,
  TEST_SUITES,
  TEST_SUITE_DESCRIPTION,
  TEST_SUITE_WATERMARK,
} from "./constants";
import {addValuesToArrayMetadata, getMetadata} from "./util/metadata_util";

interface TestSuiteOptions {
  skip: boolean;
  desc: string;
}

const DEFAULT_TEST_SUITE_OPTIONS: TestSuiteOptions = {
  skip: false,
  desc: null,
};

export function Test(options: Partial<TestSuiteOptions> = {}): MethodDecorator {
  return (target, name, descriptor) => {
    options = {...DEFAULT_TEST_SUITE_OPTIONS, ...options};

    const fun = descriptor.value;

    Reflect.defineMetadata(TEST_SUITE_WATERMARK, true, fun);
    Reflect.defineMetadata(TEST_SUITE_DESCRIPTION, options.desc || name, fun);
    Reflect.defineMetadata(TEST_SUITE_SKIP, !!options.skip, fun);

    addValuesToArrayMetadata(target.constructor, TEST_SUITES, name);
  };
}

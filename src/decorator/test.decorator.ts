import {
  TEST_SUITE_SKIP,
  TEST_SUITES,
  TEST_SUITE_DESCRIPTION,
  TEST_SUITE_WATERMARK,
} from "./constants";
import {addValuesToArrayMetadata, defineMetadata} from "./util/metadata_util";

interface TestSuiteOptions {
  skip: boolean;
  desc: string;
}

const DEFAULT_TEST_SUITE_OPTIONS: TestSuiteOptions = {
  skip: false,
  desc: null,
};

export function Test(options: Partial<TestSuiteOptions> = {}) {
  return (fn: Function, ctx: ClassMethodDecoratorContext) => {
    const name = ctx.name as string;

    options = {...DEFAULT_TEST_SUITE_OPTIONS, ...options};

    ctx.addInitializer(function (this: any) {
      defineMetadata(fn, TEST_SUITE_WATERMARK, true);
      defineMetadata(fn, TEST_SUITE_DESCRIPTION, options.desc || name);
      defineMetadata(fn, TEST_SUITE_SKIP, !!options.skip);

      addValuesToArrayMetadata(this.constructor, TEST_SUITES, name);
    });
  };
}

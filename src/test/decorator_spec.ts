import {Test, TestClass} from "../decorator";
import {TEST_CLASS_DESC} from "../decorator/constants";
import {getMetadata} from "../decorator/util/metadata_util";
import {validateIsTestClass} from "../decorator/util/validation_util";
import {ClassFixture} from "./utils/class_fixture";

@TestClass()
export class DecoratorSpec {
  private static readonly CUSTOM_CLS_DESC = "custom_class_desc";

  @Test()
  test_class() {
    expect(() => validateIsTestClass(ClassFixture.NOT())).toThrow(
      new TypeError("[object Object] is not a valid test class.\n" + "@TestClass\nclass Foo {}")
    );

    expect(() => validateIsTestClass(ClassFixture.NOOP())).toThrow(
      new TypeError(
        "Ctor: NoopCls is not a valid test class.\n" +
          "Use the @TestClass decorator to mark it as test class."
      )
    );

    const testClass = ClassFixture.TEST_CLASS();
    expect(() => validateIsTestClass(testClass)).not.toThrow();
    expect(getMetadata(testClass, TEST_CLASS_DESC)).toEqual(testClass.name);

    const withCustomDesc = ClassFixture.TEST_CLASS_WITH_CUSTOM_DESC(DecoratorSpec.CUSTOM_CLS_DESC);
    expect(getMetadata(withCustomDesc, TEST_CLASS_DESC)).toEqual(DecoratorSpec.CUSTOM_CLS_DESC);
  }

  @Test()
  test_suite() {
    /* TODO */
  }

  @Test()
  before_all_hook() {
    /* TODO */
  }

  @Test()
  before_each_hook() {
    /* TODO */
  }

  @Test()
  after_all_hook() {
    /* TODO */
  }

  @Test()
  after_each_hook() {
    /* TODO */
  }
}

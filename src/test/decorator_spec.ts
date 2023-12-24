import {Test, TestClass} from "../decorator";
import {TEST_CLASS_DESC} from "../decorator/constants";
import {getMetadata} from "../decorator/util/metadata_util";
import {validateIsTestClass} from "../decorator/util/validation_util";

@TestClass()
export class DecoratorSpec {
  // Explicitly typed as any to fool validator
  static NON_CLS: any = {};
  static NOOP_CLS = /* @__PURE__ */ class NoopCls {};
  static TEST_CLS =
    /* @__PURE__ */ @TestClass()
    class TestCls {};
  static TEST_CLS_WITH_CUSTOM_DESC =
    /* @__PURE__ */ @TestClass({desc: "cls_custom_desc"})
    class TestClsWithCustomDesc {};

  @Test()
  test_class() {
    expect(() => validateIsTestClass(DecoratorSpec.NON_CLS)).toThrow(
      new TypeError("[object Object] is not a valid test class.\n" + "@TestClass\nclass Foo {}")
    );

    expect(() => validateIsTestClass(DecoratorSpec.NOOP_CLS)).toThrow(
      new TypeError(
        "Ctor: NoopCls is not a valid test class.\n" +
          "Use the @TestClass decorator to mark it as test class."
      )
    );

    expect(() => validateIsTestClass(DecoratorSpec.TEST_CLS)).not.toThrow();
    expect(getMetadata(DecoratorSpec.TEST_CLS, TEST_CLASS_DESC)).toEqual(
      DecoratorSpec.TEST_CLS.name
    );

    expect(getMetadata(DecoratorSpec.TEST_CLS_WITH_CUSTOM_DESC, TEST_CLASS_DESC)).toEqual(
      "cls_custom_desc"
    );
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

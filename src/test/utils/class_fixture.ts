import {TestClass} from "@testy/core";

export class ClassFixture {
  /**
   * Explicitly typed as any to fool validator
   */
  static NOT(): any {
    return {};
  }

  static NOOP() {
    return class NoopCls {};
  }

  static TEST_CLASS() {
    @TestClass()
    class TestCls {}
    return TestCls;
  }

  static TEST_CLASS_WITH_CUSTOM_DESC(desc: string) {
    @TestClass({desc})
    class TestClsWithDesc {}
    return TestClsWithDesc;
  }
}

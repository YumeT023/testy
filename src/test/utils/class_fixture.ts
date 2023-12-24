import {TestClass} from "../../decorator";

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
    return @TestClass()
    class TestCls {};
  }

  static TEST_CLASS_WITH_CUSTOM_DESC(desc: string) {
    return @TestClass({
      desc,
    })
    class TestClsWithDesc {};
  }
}

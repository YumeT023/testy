import {Ctor} from "../../types";
import {TEST_CLASS_WATERMARK, TEST_SUITE_WATERMARK} from "../constants";
import {findMetadata} from "./metadata_util";

export function validateIsTestClass(Ctor: Ctor<any>) {
  const INVALID_TEST_CLASS = "Ctor: " + Ctor.name + " is not a valid test class.\n";

  if (!Ctor || typeof Ctor !== "function") {
    throw new TypeError(INVALID_TEST_CLASS + "@TestClass\nclass Foo {}");
  }

  if (!findMetadata(Ctor, TEST_CLASS_WATERMARK)) {
    throw new TypeError(
      INVALID_TEST_CLASS + "Use the @TestClass decorator to mark it as test class.\n"
    );
  }
}

export function validateIsTestSuiteFn(fun: Function) {
  const INVALID_TEST_SUITE = "Function: " + fun.name + " is not a valid test suite.\n";

  if (!fun || typeof fun !== "function") {
    throw new TypeError("test suite should be a method");
  }

  if (!findMetadata(fun, TEST_SUITE_WATERMARK)) {
    throw new TypeError(INVALID_TEST_SUITE + "@Test()\ntest_suite_example() {}");
  }
}

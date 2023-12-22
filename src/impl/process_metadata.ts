import {
  AFTER_ALL_HOOKS,
  AFTER_EACH_HOOKS,
  BEFORE_ALL_HOOKS,
  BEFORE_EACH_HOOKS,
  TEST_CLASS_DESC,
  TEST_SUITES,
  TEST_SUITE_DESCRIPTION,
  TEST_SUITE_SKIP,
} from "../decorator/constants";
import {getMetadata, getMetadataOrDefault} from "../decorator/util/metadata_util";
import {validateIsTestSuiteFn} from "../decorator/util/validation_util";
import {Ctor} from "../types";
import {mapNonNullish} from "../util/nullish";
import {ProcessedTestClass, RawTestClassMetadata, TestHook, TestSuite} from "./types";

export function scanMetadata(Ctor: Ctor<any>): RawTestClassMetadata {
  return {
    desc: getMetadata(Ctor, TEST_CLASS_DESC),
    suites: getMetadataOrDefault(Ctor, TEST_SUITES, []),
    hooks: {
      beforeAll: getMetadataOrDefault(Ctor, BEFORE_ALL_HOOKS, []),
      beforeEach: getMetadataOrDefault(Ctor, BEFORE_EACH_HOOKS, []),
      afterAll: getMetadataOrDefault(Ctor, AFTER_ALL_HOOKS, []),
      afterEach: getMetadataOrDefault(Ctor, AFTER_EACH_HOOKS, []),
    },
  };
}

export function tryProcessMetadata(
  {desc, suites, hooks}: RawTestClassMetadata,
  instance: any
): ProcessedTestClass {
  return {
    instanciated: instance,
    desc,
    suites: processFn(suites, instance, tryProcessTestSuite),
    afterAllHooks: processFn(hooks.afterAll, instance, tryProcessHook),
    afterEachHooks: processFn(hooks.afterEach, instance, tryProcessHook),
    beforeAllHooks: processFn(hooks.beforeAll, instance, tryProcessHook),
    beforeEachHooks: processFn(hooks.beforeEach, instance, tryProcessHook),
  };
}

function tryProcessTestSuite(fun: () => void): TestSuite {
  validateIsTestSuiteFn(fun);
  return {
    desc: getMetadata(fun, TEST_SUITE_DESCRIPTION),
    skip: getMetadata(fun, TEST_SUITE_SKIP),
    run: fun,
  };
}

function tryProcessHook(fun: () => void): TestHook {
  return {
    run: fun,
  };
}

function processFn<T extends TestSuite | TestHook>(
  functions: string[],
  classInstance: any,
  doProcess: (fun: () => any) => T
): T[] {
  return mapNonNullish(
    functions.map((fn) => {
      const fun = classInstance[fn];
      if (!fun) return null;
      try {
        return doProcess(fun);
      } catch {
        /* EMPTY */
      }
    })
  );
}

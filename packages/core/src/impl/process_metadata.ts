import {
  AFTER_ALL_HOOKS,
  AFTER_EACH_HOOKS,
  BEFORE_ALL_HOOKS,
  BEFORE_EACH_HOOKS,
  TEST_CLASS_DESC,
  TEST_SUITES,
  TEST_SUITE_DESCRIPTION,
  TEST_SUITE_SKIP,
} from "../decorators/constants";
import {getMetadata, getMetadataOrDefault} from "../decorators/util/metadata_util";
import {validateIsTestSuiteFn} from "../decorators/util/validation_util";
import {Ctor} from "../types";
import {mapNonNullish} from "../util/nullish";
import {ProcessedTestClass, RawTestClassMetadata, TestHook, TestSuite} from "./types";

export function scanMetadata(Ctor: Ctor<any>): RawTestClassMetadata {
  return {
    desc: getMetadata(TEST_CLASS_DESC, Ctor),
    suites: getMetadataOrDefault(TEST_SUITES, Ctor, []),
    hooks: {
      beforeAll: getMetadataOrDefault(BEFORE_ALL_HOOKS, Ctor, []),
      beforeEach: getMetadataOrDefault(BEFORE_EACH_HOOKS, Ctor, []),
      afterAll: getMetadataOrDefault(AFTER_ALL_HOOKS, Ctor, []),
      afterEach: getMetadataOrDefault(AFTER_EACH_HOOKS, Ctor, []),
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
    desc: getMetadata(TEST_SUITE_DESCRIPTION, fun),
    skip: getMetadata(TEST_SUITE_SKIP, fun),
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

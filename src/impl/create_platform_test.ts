import {PlatformTest, ProcessedTestClass} from "./types";

interface CompileTestFn {
  (): (clazz: ProcessedTestClass) => PlatformTest;
  (framework: string): (clazz: ProcessedTestClass) => PlatformTest;
}

export const createPlatformTest: CompileTestFn = (_framework?: string) => {
  return ({
    desc,
    instanciated: env,
    suites,
    afterAllHooks,
    afterEachHooks,
    beforeAllHooks,
    beforeEachHooks,
  }) => {
    function runTestSuites() {
      suites.forEach((suite) => {
        const doTest = suite.skip ? test.skip : test;
        doTest(suite.desc, () => {
          suite.run.call(env);
        });
      });
    }

    function runTestHooks() {
      afterAllHooks.forEach((hook) => {
        afterAll(() => {
          hook.run.call(env);
        });
      });
      afterEachHooks.forEach((hook) => {
        afterEach(() => {
          hook.run.call(env);
        });
      });
      beforeAllHooks.forEach((hook) => {
        beforeAll(() => {
          hook.run.call(env);
        });
      });
      beforeEachHooks.forEach((hook) => {
        beforeEach(() => {
          hook.run.call(env);
        });
      });
    }

    function runAll() {
      describe(desc, () => {
        runTestHooks();
        runTestSuites();
      });
    }

    return {runAll, runTestHooks, runTestSuites};
  };
};

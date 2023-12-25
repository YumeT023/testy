import {Platform, RunnableTest, ProcessedTestClass} from "@testy/core";

export default class PlatformJestImpl extends Platform {
  override compileTestMetadata({
    desc,
    suites,
    afterAllHooks,
    afterEachHooks,
    beforeAllHooks,
    beforeEachHooks,
    instanciated: env,
  }: ProcessedTestClass): RunnableTest {
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
  }
}

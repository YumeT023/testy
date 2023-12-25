import {Platform, ProcessedTestClass, RunnableTest} from "@testy/core";

export class MockPlatformImpl extends Platform {
  compileTestMetadata(_metadata: ProcessedTestClass): RunnableTest {
    return {} as any;
  }
}

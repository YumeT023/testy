import {Platform} from "../../platform";
import {ProcessedTestClass, RunnableTest} from "../../types";

export class MockPlatformImpl extends Platform {
  compileTestMetadata(_metadata: ProcessedTestClass): RunnableTest {
    return {} as any;
  }
}

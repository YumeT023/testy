export interface ProcessedTestClass {
  instanciated: any;
  desc: string;
  beforeAllHooks: TestHook[];
  beforeEachHooks: TestHook[];
  afterAllHooks: TestHook[];
  afterEachHooks: TestHook[];
  suites: TestSuite[];
}

export interface RawTestClassMetadata {
  desc: string;
  hooks: {
    beforeAll: string[];
    beforeEach: string[];
    afterAll: string[];
    afterEach: string[];
  };
  suites: string[];
}

export interface PlatformTest {
  runAll(): void;
  runTestSuites(): void;
  runTestHooks(): void;
}

export interface TestHook {
  run: () => void;
}

export interface TestSuite {
  desc: string;
  skip: boolean;
  run(): void;
}

export interface RunnableTest {
  runAll(): void;
  runTestSuites(): void;
  runTestHooks(): void;
}

import {Ctor, ProcessedTestClass} from "../types";
import {RunnableTest} from "./runnable_test";

export abstract class Platform {
  static tryGetPlatformImpl<T extends Platform>(framework: Framework): T {
    const moduleName = `@testy/platform_${framework}`;

    let Impl: Ctor<T>;

    try {
      // /!\ Explicitly loaded sync because test declaration should be sync
      const mod = require(moduleName);
      Impl = mod.default || mod.Impl;
    } catch {
      console.log("Unable to load platform mod. Try to install: '" + moduleName + "'");
      process.exit(1);
    }

    if (!Impl || !new Impl().compileTestMetadata) {
      console.log("Invalid platform impl");
      process.exit(1);
    }

    return new Impl();
  }

  abstract compileTestMetadata(metadata: ProcessedTestClass): RunnableTest;
}

export type Framework = "jest" | "playwright" | "vitest" | "cypress" | "mocha";

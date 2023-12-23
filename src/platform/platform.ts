import {Ctor, ProcessedTestClass} from "../types";
import {RunnableTest} from "./runnable_test";

export abstract class Platform {
  static async tryGetPlatformImpl<T extends Platform>(framework: Framework): Promise<T> {
    const moduleName = `@yumii.saiko/testy_${framework}_platform`;

    let Impl: Ctor<T>;

    try {
      const mod = await import(moduleName);
      Impl = mod.default || mod.impl;
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

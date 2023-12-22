import {validateIsTestClass} from "../decorator/util/validation_util";
import {Ctor} from "../types";
import {createPlatformTest} from "./create_platform_test";
import {scanMetadata, tryProcessMetadata} from "./process_metadata";

export function DECLARE_TESTS(Ctors: Ctor<any>[]) {
  for (const Ctor of Ctors) {
    validateIsTestClass(Ctor);
    const instance = new Ctor();
    const metadata = tryProcessMetadata(scanMetadata(Ctor) /* raw */, instance);
    const platformTest = createPlatformTest(null /* TODO: framework */)(metadata);
    platformTest.runAll();
  }
}

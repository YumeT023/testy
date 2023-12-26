import {validateIsTestClass} from "../decorators/util/validation_util";
import {Framework, Platform} from "../platform/platform";
import {Ctor} from "../types";
import {scanMetadata, tryProcessMetadata} from "./process_metadata";

type SetPlatform = Framework | Ctor<Platform>;

export function defineTests(Ctors: Ctor<any>[], platform: SetPlatform) {
  const platformImpl = _tryGetPlatform(platform);
  for (const Ctor of Ctors) {
    const test = _defineTest(Ctor, platformImpl);
    test.runAll();
  }
}

// /!\ Explicitly Syncify because test declaration shouldn't be asynchronous
function _tryGetPlatform(ImplCtorOrframework: SetPlatform) {
  if (typeof ImplCtorOrframework === "string") {
    return Platform.tryGetPlatformImpl(ImplCtorOrframework);
  }
  return new ImplCtorOrframework();
}

function _defineTest(Ctor: Ctor<any>, platform: Platform) {
  validateIsTestClass(Ctor);
  const instance = new Ctor();
  const metadata = tryProcessMetadata(scanMetadata(Ctor) /* raw */, instance);
  return platform.compileTestMetadata(metadata);
}

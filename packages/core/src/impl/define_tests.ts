import {validateIsTestClass} from "../decorator/util/validation_util";
import {Framework, Platform} from "../platform/platform";
import {Ctor} from "../types";
import {scanMetadata, tryProcessMetadata} from "./process_metadata";

type SetPlatform = Framework | Ctor<Platform>;

export function defineTests(Ctors: Ctor<any>[], platform: SetPlatform) {
  const platformImpl = _tryGetPlatformImpl(platform).next().value as Platform;
  for (const Ctor of Ctors) {
    const test = _defineTest(Ctor, platformImpl);
    test.runAll();
  }
}

// /!\ sync-ify because test declaration doesn't work in jest and
// might not work in other testing framework either
function* _tryGetPlatformImpl(frameworkOrImplCtor: SetPlatform) {
  if (typeof frameworkOrImplCtor === "string") {
    yield Platform.tryGetPlatformImpl(frameworkOrImplCtor /* framework name */);
    return; // for type guard
  }
  yield /* @__PURE__ */ new frameworkOrImplCtor();
}

function _defineTest(Ctor: Ctor<any>, platform: Platform) {
  validateIsTestClass(Ctor);
  const instance = new Ctor();
  const metadata = tryProcessMetadata(scanMetadata(Ctor) /* raw */, instance);
  return platform.compileTestMetadata(metadata);
}

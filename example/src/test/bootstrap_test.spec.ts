import {defineTests} from "@yumii.saiko/testy";
import {SumTest} from "../sum";
import {PlatformJestImpl} from "../lib/testy_platform_jest";

defineTests([SumTest], PlatformJestImpl);

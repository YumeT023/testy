import {defineTests} from "@testy/core";
import {DecoratorSpec} from "./decorator_spec";
import PlatformJestImpl from "@testy/platform_jest";

defineTests([DecoratorSpec], PlatformJestImpl);

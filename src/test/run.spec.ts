import {defineTests} from "../";
import {PlatformJestImpl} from "../platform/jest_impl";
import {DecoratorSpec} from "./decorator_spec";

defineTests([DecoratorSpec], PlatformJestImpl);

import {AFTER_ALL_HOOKS} from "./constants";
import {makeFunMarkerDecorator} from "./util/make_fun_marker_decorator";

export const AfterAll = makeFunMarkerDecorator(AFTER_ALL_HOOKS);

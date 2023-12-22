import {AFTER_EACH_HOOKS} from "./constants";
import {makeFunMarkerDecorator} from "./util/make_fun_marker_decorator";

export const AfterEach = makeFunMarkerDecorator(AFTER_EACH_HOOKS);

import {BEFORE_ALL_HOOKS} from "./constants";
import {makeFunMarkerDecorator} from "./util/make_fun_marker_decorator";

export const BeforeAll = makeFunMarkerDecorator(BEFORE_ALL_HOOKS);

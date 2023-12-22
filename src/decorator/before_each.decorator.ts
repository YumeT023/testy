import {BEFORE_EACH_HOOKS} from "./constants";
import {makeFunMarkerDecorator} from "./util/make_fun_marker_decorator";

export const BeforeEach = makeFunMarkerDecorator(BEFORE_EACH_HOOKS);

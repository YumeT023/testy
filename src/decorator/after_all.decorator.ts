import {AFTER_ALL_HOOKS} from "./constants";
import {registerFunDecoratorFactory} from "./util/register_fun_decorator_factory";

export const AfterAll = registerFunDecoratorFactory(AFTER_ALL_HOOKS);

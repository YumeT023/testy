import {AFTER_EACH_HOOKS} from "./constants";
import {registerFunDecoratorFactory} from "./util/register_fun_decorator_factory";

export const AfterEach = registerFunDecoratorFactory(AFTER_EACH_HOOKS);

import {BEFORE_ALL_HOOKS} from "./constants";
import {registerFunDecoratorFactory} from "./util/register_fun_decorator_factory";

export const BeforeAll = registerFunDecoratorFactory(BEFORE_ALL_HOOKS);

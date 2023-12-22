export interface Ctor<T> extends Function {
  new (...args: unknown[]): T;
}

export type ClassDecorator = (type: Ctor<unknown>, ctx: ClassDecoratorContext) => any;
export type ClassMethodDecorator = (f: Function, ctx: ClassMethodDecoratorContext) => any;

export type * from "./platform/platform_capabilities";
export type * from "./impl/types";

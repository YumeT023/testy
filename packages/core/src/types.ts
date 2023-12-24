export type ClassDecorator = (type: Ctor<unknown>, ctx: ClassDecoratorContext) => any;

export type ClassMethodDecorator = (f: Function, ctx: ClassMethodDecoratorContext) => any;

export interface Ctor<T> extends Function {
  new (...args: unknown[]): T;
}

export type * from "./platform/runnable_test";
export type * from "./impl/types";

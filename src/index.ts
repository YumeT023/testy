import "reflect-metadata";

function Bean(): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {};
}

class Subject {
  @Bean()
  init(): Subject {
    return null;
  }
}

import RouteMapperType from "../RouteMapperType";

const Get = (path: string): MethodDecorator => {
  return (target: any, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteMapperType>;
    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey.toString()
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export default Get
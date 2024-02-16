import RouteMapperType from "../RouteMapperType";

const Trace = (path: string) => {
    return (target: any, propertyKey: string): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }
        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteMapperType>;
        routes.push({
            requestMethod: 'trace',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}

export default Trace
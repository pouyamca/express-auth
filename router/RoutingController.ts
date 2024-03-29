import { Router } from 'express';


const RoutingController = (prefix: string = ''): ClassDecorator => {

  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };

};
export default RoutingController 
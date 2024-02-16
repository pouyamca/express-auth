import { RequestHandler } from 'express';

export default interface RouteMapperType {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'patch' | 'put' | 'trace';
  methodName: string | symbol;
}
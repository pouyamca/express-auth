import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import ControllerList from './router/dispatcher'
import RouteMapper from './router/RouteMapperType';
import { setupSwagger } from './swagger';
// +++++ import connectDB from './configsOrInfrastructures/DB'

const app: Express = express();
const port = 5000;
// ++++++ connectDB()


//app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

setupSwagger(app);

export const routers = Object.keys(ControllerList).forEach(Controller => {

  const instance = new ControllerList[Controller as keyof typeof ControllerList]()
  const prefix = Reflect.getMetadata('prefix', ControllerList[Controller as keyof typeof ControllerList]);
  const routes: Array<RouteMapper> = Reflect.getMetadata('routes', ControllerList[Controller as keyof typeof ControllerList]);

  routes.forEach(route => {
    app[route.requestMethod](prefix + route.path, (req: Request, res: Response, next: NextFunction) => {
      instance[route.methodName as keyof typeof instance](req, res, next);
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app

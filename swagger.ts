import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import controllers from './router/dispatcher';
import path from 'path';

let sm = Object.keys(controllers);

let adress = Object.keys(controllers).map((controller: any, index: number) => {
    return `${__dirname}/controllers/${controller}.ts`
})

console.log(adress)

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API',
            version: '1.0.0',
            description: 'API documentation',
        },
    },
    // apis: adress,
    apis: ["./controllers/*.ts"],

};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
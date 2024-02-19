import fs from 'fs';
import path from 'path';
export type ControllersType = { [key: string]: any }
const controllers: ControllersType = {};

fs.readdirSync('./controllers').forEach((file) => {
    const filePath = path.join('controllers', file);
    const module = require('../' + filePath).default;
    const moduleName = path.basename(filePath, path.extname(file));
    controllers[moduleName] = module;

});

export default controllers;


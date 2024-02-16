import { Request, Response } from 'express';
import Route from '../routeMapper/RoutingController';
import { Get, Post, Trace } from '../routeMapper/methods/index';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { jwtGenerator, jwtRefreshExtractor, jwtRefreshGenerator } from '../helpers/jwtHelpers';
import Auth from '../middlewares/Auth';
export const SECRET_KEY: Secret = 'your-secret-key-here';

@Route('/admin')
export default class AdminController {

    @Get('/')
    public index(req: Request, res: Response) {
        return res.send('User overview');
    }


}
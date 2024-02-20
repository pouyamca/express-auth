import { Request, Response } from 'express';
import Route from '../router/RoutingController';
import { Get, Post, Trace } from '../router/methods/index';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { jwtGenerator, jwtRefreshExtractor, jwtRefreshGenerator } from '../helpers/jwtHelpers';
import Auth from '../middlewares/Auth';
import BodyValidator from '../middlewares/Validator';
import { userRegisterForm } from '../validations/users';
import { createUser } from '../models/User';
import { UserRegisterDto } from '../entities/DTO/user.dto';
export const SECRET_KEY: Secret = 'your-secret-key-here';

@Route('/user')
export default class UserController {

    @Get('/')
    public index(req: Request, res: Response) {
        return res.send('User overview');
    }

    @Post('/authorizatior')
    public async login(req: Request, res: Response) {
        const data: Object = req?.body?.role || {}

        const jwtToken = 'Bearer ' + await jwtGenerator({ role: data })
        const jwtRefreshToken = 'Bearer ' + await jwtRefreshGenerator({ role: 'public' })
        return res.status(200).json({ accessToken: jwtToken, refreshToken: jwtRefreshToken });
    }

    @Post('/reauthorizatior')
    public async reLogin(req: Request, res: Response) {
        const data: Object = req?.body?.role || {}

        const body = req.body || ''
        const token = body?.refreshToken?.split('Bearer ')[1]

        if (!token) {
            res.status(403).json({ 'token': 'not authorize' })
        } else {

            const decryptionResult = await jwtRefreshExtractor(token)
            const existedData = (typeof decryptionResult === 'object') ? decryptionResult?.data : { role: 'notFound', time: 0 }
            if (decryptionResult && existedData?.role === 'public' && existedData?.time >= (new Date().getTime() / 1000)) {

                const jwtToken = 'Bearer ' + await jwtGenerator({ role: 'public' })
                const jwtRefreshToken = 'Bearer ' + await jwtRefreshGenerator({ role: 'public' })
                return res.status(200).json({ accessToken: jwtToken, refreshToken: jwtRefreshToken });

            } else if (existedData?.time <= (new Date().getTime() / 1000)) {
                res.status(403).json({ 'token': 'expired' })

            } else {
                res.status(403).json({ 'token': 'not authorize' })

            }
        }
    }



    @Post('/roleCheker')
    @Auth('admin')
    public async authrization(req: Request, res: Response) {

        const data: Object = req?.body?.role || {}

        return res.status(200).json({ yourRole: data });
    }

    @Post('/:name')

    public details(req: Request, res: Response) {
        const token = jwt.sign({ _id: 1, name: 'pouya' }, SECRET_KEY, {
            expiresIn: '2 days',
        });

        return res.send(`You are looking at the profile of ${req.params.name}`);
    }

    @Post('/registering')
    @BodyValidator(userRegisterForm)

    public async regiter(req: Request, res: Response) {
        let data = JSON.parse(JSON.stringify(req.body))
        let result = await createUser(<UserRegisterDto>data)
        if (result) {
            return res.status(201).json({ success: true, result })
        } else {
            return res.status(200).json({ success: false, result })
        }
    }


    /**
     * @swagger
     * /user:
     *   get:
     *     description: Why you no work?
     *     responses:
     *       200:
     *         description: Returns nothing cause this shit won't work.
     */

    @Get('/smplae')
    public showSample(req: Request, res: Response) {
        console.log('req')
        return res.send('User overview');

    }

}
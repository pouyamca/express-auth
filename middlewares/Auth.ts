import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { jwtExtractor } from '../helpers/jwtHelpers';

export type RolesType = 'admin' | 'user' | 'public'

const Auth = (role: RolesType): MethodDecorator => {

    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {

        const original = descriptor.value
        descriptor.value = async (...args: any) => {

            const request = args[0] as Request
            const response = args[1] as Response
            const headers = request.headers
            const token = headers.authorization?.split('Bearer ')[1]
            if (!token) {
                response.status(403).json({ 'token': 'not authorize' })
            } else {

                const decryptionResult = await jwtExtractor(token)
                const existedData = (typeof decryptionResult === 'object') ? decryptionResult?.data : { role: 'notFoune', time: 0 }
                if (decryptionResult && existedData?.role === role && existedData?.time >= (new Date().getTime() / 1000)) {
                    return original.apply(this, args)

                } else if (existedData?.time <= (new Date().getTime() / 1000)) {
                    response.status(403).json({ 'token': 'expired' })

                } else {
                    response.status(403).json({ 'token': 'not authorize' })

                }
            }





        }
    }
}

export default Auth


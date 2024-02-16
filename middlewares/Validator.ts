import { ifError } from 'assert';
import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema, ObjectSchema, ValidationError } from 'yup';

export type BodyContainedMethod = "POST" | "PUT" | "PATCH" | "DELETE"

const BodyValidator = (schemaDto: AnyObjectSchema): MethodDecorator => {

    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {

        const original = descriptor.value
        descriptor.value = async (req: Request, res: Response, next: NextFunction) => {


            if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH" || req.method === "DELETE") {
                let body = JSON.parse(JSON.stringify(req.body))

                try {

                    await schemaDto.validate(body);
                    original.call(this, req, res, next);
                } catch (err) {

                    return res.status(409).json({ success: false, message: (err as ValidationError)?.message });

                }

            } else {

                return res.status(409).json({ success: false, result: 'validation calling error' });

            }

        }
    }
}

export default BodyValidator
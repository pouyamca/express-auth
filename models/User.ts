import { model } from 'mongoose';
import { string } from 'yup';
import { query } from 'express';
import { TypeUpdateUser, TypeUser } from '../entities/types/types';
import { UserSchema } from '../entities/schema/schema';


const UserModel = model<TypeUser>('User', UserSchema);
export default UserModel

export const createUser = async (data: TypeUser): Promise<boolean> => {

    try {
        return await UserModel.create(data)
            .then((createdUser) => {
                if (!createdUser) return false
                else return true
            }).catch((err) => {
                // console.log(err)
                return false
            })
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUser = async (id: string, data: TypeUpdateUser): Promise<boolean> => {

    try {
        const condition = { universalId: id };


        let doc = await UserModel.findOneAndUpdate(condition, data);
        return doc ? true : false
    } catch (err) {
        return false
    }
}


export const searchUser = async (searchParam: string, pageNumber: string | number = 0): Promise<TypeUser[] | boolean> => {
    let result
    try {
        result = await UserModel.find({ titlePr: { $regex: new RegExp(searchParam, 'i') } }).limit(15).skip(15 * (1 - +pageNumber));
        return result

    } catch (error) {

        return false
    }
}



export const readUser = async (pageNumber?: string | number): Promise<TypeUser[] | boolean> => {
    let result
    try {
        if (pageNumber) {
            result = await UserModel.find({}, { _id: 0 }).limit(15).skip(15 * (1 - +pageNumber));
        } else {
            result = await UserModel.find({}, { _id: 0 });
        }
        return result

    } catch (error) {

        return false
    }
}


export const raedSingleUser = async (ID: string | number): Promise<TypeUser | boolean> => {
    let result
    try {

        result = await UserModel.findOne({ universalId: ID }) || false
        return result

    } catch (error) {

        return false
    }
}
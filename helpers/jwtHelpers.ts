import jwt, { JwtPayload } from 'jsonwebtoken'
import dotEnv from 'dotenv'

dotEnv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY || '';
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY || '';


export const jwtExtractor = async (encryptedToken: string): Promise<boolean | string | JwtPayload> => {
    try {
        const tokenBody = jwt.verify(encryptedToken, jwtSecretKey);

        if (tokenBody) {
            return tokenBody;
        } else {
            return false;
        }
    } catch (err) {

        return false
    }

}

export const jwtRefreshExtractor = async (encryptedToken: string): Promise<boolean | string | JwtPayload> => {
    try {
        const tokenBody = jwt.verify(encryptedToken, jwtRefreshSecretKey);

        if (tokenBody) {
            return tokenBody;
        } else {
            return false;
        }
    } catch (err) {

        return false
    }

}

export const jwtGenerator = async (input: Object) => {

    const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes
    const data = { ...input, time: expirationTime }
    const token = jwt.sign({ data }, jwtSecretKey, { expiresIn: expirationTime });

    return token
}

export const jwtRefreshGenerator = async (input: Object) => {

    const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60 * 60 * 24; // 15 day
    const data = { ...input, time: expirationTime }
    const token = jwt.sign({ data }, jwtRefreshSecretKey, { expiresIn: expirationTime });

    return token
} 
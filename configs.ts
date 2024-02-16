import * as dotenv from 'dotenv';
dotenv.config();

const configs = {
    jwt: {
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    port: process.env.PORT || 3000,
    prefix: process.env.API_PREFIX || 'api',
    basicMime: process.env.BASIC_SUPPORTED_FORMATS || '',
    basicFileSize: process.env.BASIC_SUPPORTED_FORMATS || 2,
    ourEmailProvider: process.env.OUR_EMAIL || 'sample@gmail.com'
};

export default configs;
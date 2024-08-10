import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;  
    // or: 앞에 값이 true로 판별되면 앞의 값이 대입되고 같이 false로 판별되면 뒤에 값이 대입됨
    if(value == null){
        throw new Error(`키 ${key}는 undefined!!`);
    }
    return value;
}

export const config = {
    db: {
        DB_URI: required('DB_URI').toString(),
        DB_NAME: required('DB_NAME').toString(),
    },
    // api: {
    //     API_KEY1: required('API_KEY1').toString(),
    //     API_KEY2: required('API_KEY2').toString(),
    // },
    
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
};
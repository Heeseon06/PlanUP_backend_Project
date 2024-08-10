import jwt from 'jsonwebtoken';
import * as authRepository from '../models/user.js';

const AUTH_ERROR = {message: "인증에러"};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        console.log('에러1');
        console.log(authHeader)
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
    }
    
    jwt.verify(
        token, 'abcd1234%^&*', async(error, decoded) => {
            if(error){
                console.log(token)
                console.log('에러2');
                console.error(error);
                return res.status(401).json(AUTH_ERROR);
            }
            const user = await authRepository.findById(decoded.id);
            if(!user){
                console.log('에러3');
                return res.status(401).json(AUTH_ERROR);
            }
            req.user = user;
            req.token = token;
            next();
        }
    );
}
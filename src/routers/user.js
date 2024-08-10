import express from "express";
import * as authController from '../controllers/user.js';
import { isAuth } from '../middlewares/user.js';

const router = express.Router()


router.delete('/:userid', isAuth, authController.del_user);

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/get_user', authController.me);

router.get('/verifyToken', isAuth, (req, res) => {
    const user = req.user; // req.user에서 사용자 정보 가져오기
    const token = req.token; // req.token에서 토큰 정보 가져오기

    console.log('verifyToken:', user);

    res.status(200).json({ success: true, user, token });
});

export default router

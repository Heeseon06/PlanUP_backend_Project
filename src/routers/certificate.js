import express from 'express';
import * as certificateController from '../controllers/certificate.js';
import { isAuth } from '../middlewares/user.js';

const router = express.Router();


router.get('/', isAuth, certificateController.getAllCertificate);

// 해당 job_name 대한 자격증 리턴 => 필요없음 
// router.get('/job_name', isAuth, certificateController.getNameCertificate);
// router.post('/job_name', isAuth, certificateController.getNameCertificate);

// 부분일치 job_name 대한 자격증 리턴
router.get('/job_name', isAuth, certificateController.getAllNameCertificate);
router.post('/job_name', isAuth, certificateController.getAllNameCertificate);


export default router;
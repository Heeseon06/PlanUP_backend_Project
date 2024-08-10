import express from 'express';
import * as checklistController from '../controllers/checklist.js';
import { isAuth } from '../middlewares/user.js';

const router = express.Router();


router.get('/', isAuth, checklistController.getUserChecklist);

router.post('/', isAuth, checklistController.createChecklist);

router.post('/getByTodoId', isAuth, checklistController.getByTodoId);

router.get('/userid', isAuth, checklistController.getUserChecklist);

router.get('/useriddate', isAuth, checklistController.getUserDateChecklist);

router.put('/update', isAuth, checklistController.updateChecklist);

router.put('/updateCompleted', isAuth, checklistController.updateCompleted);

router.delete('/delete', isAuth, checklistController.deleteChecklist);

router.get('/:todoid/count', isAuth, checklistController.getCount);

export default router;
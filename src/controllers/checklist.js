import * as checklistRepository from '../models/checklist.js';

// 새로운 Check 리스트 생성
export async function createChecklist(req, res, next) {
    const { userid, color, examDate, list, completed, todoId } = req.body;
    console.log( userid, color, examDate, list )
    const newChecklist = await checklistRepository.createCheckList({ userid, color, examDate, list, completed, todoId });
    console.log("Check 리스트 생성 완료")
    res.status(201).json(newChecklist);
}

// 모든 Check 리스트를 가져오기
export async function getAllChecklist(req, res, next) {
    const checklists = await checklistRepository.getAll();
    console.log("모든 Check 리스트를 가져오기")
    res.status(200).json(checklists);
}


// 특정 유저의 Check 리스트를 가져오기
export async function getUserChecklist(req,res,next){
    const { userid } = req.user;
    const checklists = await checklistRepository.getAllByUserid(userid);
    res.status(200).json(checklists);
}

export async function getByTodoId(req,res,next){
    const { todoId } = req.body;
    const checklists = await checklistRepository.getAllByTodoID(todoId);
    res.status(200).json(checklists);
}

// 특정 유저와 날짜의 Check 리스트를 가져오기
export async function getUserDateChecklist(req,res,next){
    const { userid, examDate } = req.body;
    const checklists = await checklistRepository.getAllByUseridnexamDate(userid, examDate);
    res.status(200).json(checklists);
}


// Check 리스트 업데이트
export async function updateChecklist(req, res, next) {
    const { id, color, examDate, completed, list } = req.body;
    const updatedChecklist = await checklistRepository.updateCheckList(id, { color, examDate, completed, list});
        if (!updatedChecklist) {
            return res.status(404).json({ message: 'Check 리스트를 찾을 수 없습니다.' });
        }
        console.log("Check 리스트 업데이트 완료", updatedChecklist)
        res.status(200).json(updatedChecklist);
}

export async function updateCompleted(req, res, next) {
    const { id, completed } = req.body;
    const updateCompleted = await checklistRepository.updateCompleted(id, { completed });
    if (!updateCompleted) {
        return res.status(404).json({ message: 'Check 리스트를 찾을 수 없습니다.' });
    }
    console.log("Check");
    res.status(200).json(updateCompleted);
}


// Check 리스트 삭제
export async function deleteChecklist(req, res, next) {
    const { id } = req.body;
    const deletedChecklist = await checklistRepository.removeCheckList(id);
        if (!deletedChecklist) {
            return res.status(404).json({ message: 'Check 리스트를 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: 'Check 리스트가 삭제되었습니다.' });
}

export async function getCount(req, res, next) {
    const { todoid } = req.params;
    console.log(todoid);
    const count = await checklistRepository.getCount(todoid);
    console.log(count);
    res.status(200).json({ count });
}


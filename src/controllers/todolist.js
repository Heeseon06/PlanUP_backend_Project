import * as todolistRepository from '../models/todolist.js';

// 새로운 To-Do 리스트 생성
export async function createTodolist(req, res, next) {
    const { userid, title, text, color, examDate, type } = req.body;
    console.log( userid, title, text, color, examDate, type )
    const newTodolist = await todolistRepository.createTodolist({ userid, title, text, color, examDate, type});
    console.log("To-Do 리스트 생성 완료")
    res.status(201).json(newTodolist);
}

export async function getTodoId(req, res, next) {
    const { TodoId } = req.body;
    console.log(TodoId)
    const todolist = await todolistRepository.findById(TodoId);
    console.log(todolist)
    if (!todolist) {
        return res.status(404).json({ message: 'To-Do 리스트를 찾을 수 없습니다.' });
    }else{
        return res.status(200).json(todolist);
    }
}

// 모든 To-Do 리스트를 가져오기
export async function getAllTodolist(req, res, next) {
    const todolists = await todolistRepository.getAll();
    console.log("모든 To-Do 리스트를 가져오기")
    if(todolists){
        res.status(200).json(todolists);
    }else{
        return res.status(404).json({ message: 'To-Do 리스트를 찾을 수 없습니다.' });
    }
}


// 특정 유저의 To-Do 리스트를 가져오기
export async function getUserTodolist(req,res,next){
    const { userid } = req.user;
    const todolists = await todolistRepository.getAllByUserid(userid);
    console.log(todolists)
    res.status(200).json(todolists);
}


// To-Do 리스트 업데이트
export async function updateTodolist(req, res, next) {
    console.log(req.body)
    const { id, title, text, color, examDate } = req.body;
    const updatedTodolist = await todolistRepository.updateTodolist(id, { title, text, color, examDate });
        if (!updatedTodolist) {
            return res.status(404).json({ message: 'To-Do 리스트를 찾을 수 없습니다.' });
        }
        console.log("To-Do 리스트 업데이트 완료")
        res.status(200).json(updatedTodolist);
}


// To-Do 리스트 삭제
export async function deleteTodolist(req, res, next) {
    const { id } = req.params;
    console.log(id)
    console.log(req.params)
    const deletedTodolist = await todolistRepository.removeTodolist(id);
        if (!deletedTodolist) {
            return res.status(404).json({ message: 'To-Do 리스트를 찾을 수 없습니다.' });
        }
        res.status(200).json({ message: 'To-Do 리스트가 삭제되었습니다.' });
}


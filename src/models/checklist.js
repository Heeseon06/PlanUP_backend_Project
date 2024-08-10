import Mongoose, { mongo } from 'mongoose';
import { useVirtualId } from './database.js';
import mongoose from 'mongoose';

// id 자동으로 생성됨 
const checkListSchema = new Mongoose.Schema({
    userid: {type: String, require: true, ref: 'User'},
    color: {type: String, require: true},
    examDate: { type: Date,  require: true},
    list: {type: String, require: true},
    completed: { type: Boolean, default: false},
    todoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Todolist'},
    createdAt: { type: Date, default: Date.now }
})

useVirtualId(checkListSchema);
const CheckList = Mongoose.model('checklist', checkListSchema);

// 모든 리스트를 리턴
export async function getAll() {
    return CheckList.find().sort({ completed: 1, createdAt: -1 });
}

// 해당 아이디에 대한 리스트를 리턴
export async function getAllByUserid(userid) {
    return CheckList.find({ userid }).sort({ completed: 1, createdAt: -1 });
}

export async function getAllByTodoID(todoId) {
    return CheckList.find({ todoId }).sort({ completed: 1, createdAt: -1 });
}

// 해당 아이디와 날짜에 대한 리스트를 리턴
export async function getAllByUseridnexamDate(userid, examDate) {
    return CheckList.find({ userid, examDate }).sort({ completed: 1, createdAt: -1 });
}

// 새로운 Check 리스트 생성
export async function createCheckList({ userid, color, examDate, list, completed, todoId}) {
    return new CheckList({ userid, color, examDate, list, completed, todoId }).save().then(data => data.userid);
}

export async function updateCompleted(_id, { completed  }) {
    return CheckList.findByIdAndUpdate(_id, { completed  }, { new: true });
}

// Check 리스트 업데이트
export async function updateCheckList(_id, { color, examDate, list, completed, todoId  }) {
    return CheckList.findByIdAndUpdate(_id, { color, examDate, list, completed, todoId }, { new: true });
}

// Check 리스트 삭제
export async function removeCheckList(_id) {
    return CheckList.findByIdAndDelete(_id);
}

export async function getCount(todoId) {
    return CheckList.countDocuments({ todoId });
}


export default CheckList;
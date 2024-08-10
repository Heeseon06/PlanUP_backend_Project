import mongoose from 'mongoose';
import { useVirtualId } from './database.js';
import Todolist from './todolist.js';

const userSchema = new mongoose.Schema({
    name : {type:String,require:true},
    userid : {type:String,require:true},
    password : {type:String,require:true},
    hp : {type:String,require:true},
    email : {type:String,require:true},
})

useVirtualId(userSchema)


const User = mongoose.model('member',userSchema)


userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
            await Todolist.deleteMany({ userid: doc.userid });
        }
        next();
    } catch (err) {
        next(err);
    }
});

// 아이디(userid) 중복검사  // 아이디 찾기 
export async function findByUserId(userid){
    return User.findOne({userid:userid});
}

// id 중복검사
export async function findById(id){
    return User.findById(id);
}

// 회원가입
export async function createUser(user){
    return new User(user).save().then((data)=>{data.id});
}

//회원탈퇴
export async function delete_(userid) {
    return User.findOneAndDelete({ userid: userid });
}

import mongoose from 'mongoose';
import { useVirtualId } from './database.js';

const certificateSchema = new mongoose.Schema({
    // job_name: String,
    // job_code: String,
    // schedules: [
    //     {
    //         필기시험원서접수_시작일자: String,
    //         필기시험원서접수_종료일자: String,
    //         필기시험_시작일자: String,
    //         필기시험_종료일자: String,
    //         필기시험_합격_발표일자: String,
    //         응시자격_서류제출_시작일자: String,
    //         응시자격_서류제출_종료일자: String,
    //         실기시험원서접수_시작일자: String,
    //         실기시험원서접수_종료일자: String,
    //         실기시험_시작일자: String,
    //         실기시험_종료일자: String,
    //         합격자발표_시작일자: String
    //     }
    // ]
});

useVirtualId(certificateSchema);
const Certificate = mongoose.model('license', certificateSchema);

// 모든 자격증 리턴
export async function getAll() {
    return Certificate.find().sort({ createdAt: -1 });
}


// 해당 job_name 대한 자격증 리턴
// export async function getAllByName(job_name) {
//     return Certificate.find({ job_name }).sort({ job_name: 1 });  //job_name 오름차순
// }


// 부분 일치 글자로 job_name 대한 자격증 리턴
export async function getAllByNameMatch(job_name) {
    return Certificate.find({ job_name: { $regex: job_name, $options: 'i' } }).sort({ job_name: 1 });
}

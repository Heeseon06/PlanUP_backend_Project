import * as certificateRepository from '../models/certificate.js';


// 모든 자격증 리스트를 가져오기
export async function getAllCertificate(req, res, next) {
    const certificates = await certificateRepository.getAll();
    console.log("모든 자격증 가져오기")
    if(certificates){
        res.status(200).json(certificates);
    }else{
        return res.status(404).json({ message: '자격증을 찾을 수 없습니다.' });
    }
}

// job_name의 자격증 가져오기
// export async function getNameCertificate(req,res,next){
//     const { job_name } = req.body;
//     const certificates = await certificateRepository.getAllByName(job_name);
//     console.log(certificates)
//     res.status(200).json(certificates);
// }

// 부분 일치 글자로 job_name의 자격증 가져오기
export async function getAllNameCertificate(req,res,next){
    const { job_name } = req.body;
    const certificates = await certificateRepository.getAllByNameMatch(job_name);
    console.log(certificates)
    res.status(200).json(certificates);
}



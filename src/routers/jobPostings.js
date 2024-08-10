

import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// 채용 공고 스키마 정의
const jobPostingSchema = new mongoose.Schema({
  title: String,
  company: String,
  deadline: String,
  userid: String,
  URL: String,
  회사로고: String,
  todoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }
});

// 모델 생성
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

// 채용 공고 저장
router.post('/', async (req, res) => {
  try {
    console.log('@@@@@@@@@@@',req.body);
    const { title, company, deadline, userid, URL, 회사로고, todoId } = req.body;
    const newJobPosting = new JobPosting({ title, company, deadline, userid, URL, 회사로고, todoId });
    console.log('@@@@@@@@@@@@@@@',newJobPosting);
    await newJobPosting.save();
    res.status(201).send(newJobPosting);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 특정 Todo에 연결된 채용 공고 가져오기
router.get('/todo/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    console.log('Searching for job posting with todoId:', todoId);
    const jobPosting = await JobPosting.findOne({ todoId });
    if (jobPosting) {
      res.status(200).send(jobPosting);
    } else {
      res.status(404).send({ message: '채용 공고를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Error in /todo/:todoId route:', error);
    res.status(500).send(error);
  }
});

// 채용 공고 목록 가져오기
router.get('/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const jobPostings = await JobPosting.find({ userid });
    res.status(200).send(jobPostings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 채용 공고 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await JobPosting.findByIdAndDelete(id);
    res.status(200).send({ message: '채용 공고가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).send(error);
  }
});
// 채용 공고 삭제 (TodoId로)
router.delete('/todo/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const result = await JobPosting.findOneAndDelete({ todoId });
    if (result) {
      res.status(200).send({ message: '채용 공고가 삭제되었습니다.' });
    } else {
      res.status(404).send({ message: '삭제할 채용 공고를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('채용 공고 삭제 중 오류:', error);
    res.status(500).send({ message: '채용 공고 삭제 중 오류가 발생했습니다.', error: error.message });
  }
});

export default router;
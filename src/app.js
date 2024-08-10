import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './models/database.js';
import routers from './routers/index.js';
import {config}  from './config/config.js';


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/', routers);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message || 'Something went wrong!' });
});

// 타임아웃 설정 (5분)
app.timeout = 300000;

const PORT = process.env.PORT || config.host.port;


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`서버:${PORT} 연결성공`);
        });
    })
    .catch(console.error);
import express, { Request, Response, NextFunction} from 'express';
import { wppInit } from './src/wpp';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5050, () => {
})

wppInit();
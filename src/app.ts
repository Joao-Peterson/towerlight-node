import express, { Request, Response, NextFunction} from 'express';
import { wpp_exec } from './models/wpp';
import { email_exec } from "./models/email"
import { CronJob } from 'cron';
import { cfg, set_cfg } from './cfg';

try {
    set_cfg("src/config.json");
} catch (error) {
    console.log(error);
    set_cfg("src/config_default.json");
}

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// app.listen(5050, () => {
// })

// wpp_exec();

// every 10 minutes
var email_cron: CronJob = new CronJob("*/10 * * * *", () => {
    email_exec();
});

email_cron.start();

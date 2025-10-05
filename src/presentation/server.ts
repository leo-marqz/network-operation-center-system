
import color from 'picocolors';

import { CronJob } from 'cron';
import { CronService } from './cron/cron.service';
import { CheckService } from '../domain/use-cases/checks/check.service';

export class Server {
    public static start(){
        console.log(`${color.green('[INFO]')} Server is running...`);

        CronService.createJob('* * * * * *', ()=>{
            console.log('[CRON] hello world with cron', new Date());
            new CheckService().execute('https://google.com');
        });

    }
}
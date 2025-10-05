
import color from 'picocolors';

import { CronJob } from 'cron';

export class Server {
    public static start(){
        console.log(`${color.green('[INFO]')} Server is running...`);

        let job = new CronJob('*/2 * * * * *', ()=>{
            console.log("You will see this message every two second...", new Date());
        });

        job.start();

    }
}
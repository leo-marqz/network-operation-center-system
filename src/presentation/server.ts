
import color from 'picocolors';

// import { CronJob } from 'cron';
import { CronService } from './cron/cron.service';
import { CheckService } from '../domain/use-cases/checks/check.service';

export class Server {

    public static start(url: string){

        console.log(`${color.green('[INFO]')} Server is running...`);

        CronService.createJob('* * * * * *', ()=>{
            new CheckService(
                ()=> console.log(`${color.green('[OK]')} ${new Date().toUTCString()} | ${url}` ),
                (error)=> console.log(`${color.red('[ER]')} ${new Date().toUTCString()} | ${url}`) 
            )
            .execute(url);
        });

    }

}
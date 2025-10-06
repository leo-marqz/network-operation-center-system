
import color from 'picocolors';
import { CronService } from './cron/cron.service';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.impl.repository';
import { FileSystemDatasourceImpl } from '../infrastructure/datasources/filesystem.impl.datasource';

const fileSystemLogRepository = new LogRepositoryImpl( 
    new FileSystemDatasourceImpl() 
);
export class Server {

    public static start(url: string){

        console.log(`${color.green('[INFO]')} Server is running...\n`);

        CronService.createJob('*/2 * * * * *', ()=>{
            new CheckService(
                fileSystemLogRepository,
                ()=> console.log(`${color.green('[OK]')} ${new Date().toUTCString()} | ${url}` ),
                (error)=> console.log(`${color.red('[ER]')} ${new Date().toUTCString()} | ${url}`) 
            )
            .execute(url);
        });

    }

}
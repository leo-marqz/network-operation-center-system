
import color from 'picocolors';
import { CronService } from './cron/cron.service';
import { CheckService } from '../domain/use-cases/checks/check.service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.impl.repository';
import { FileSystemDatasourceImpl } from '../infrastructure/datasources/filesystem.impl.datasource';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasourceImpl() );

const emailService = new EmailService();


/**
 * @author Elmer Marquez ( leomarqz | ::crack::night:: )
 */

export class Server {

    public static start(url: string){

        console.log(`${color.green('[INFO]')} Server is running...\n`);

        console.log(`${color.green('[INFO]')} Email service is running...\n`);

        // new SendEmailLogs( emailService, fileSystemLogRepository )
        //     .execute(['leomarqz2020@gmail.com', 'leomarqz.main@gmail.com']);

        console.log(`${color.green('[INFO]')} Cron service is running...\n`);

        CronService.createJob('*/1 * * * * ', ()=>{
            new CheckService(
                fileSystemLogRepository,
                ()=> console.log(`${color.green('[OK]')} ${new Date().toUTCString()} | ${url}` ),
                (error)=> console.log(`${color.red('[ER]')} ${new Date().toUTCString()} | ${url}`) 
            )
            .execute(url);
        });

    }

}
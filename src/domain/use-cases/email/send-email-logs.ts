import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string[]): Promise<boolean> {
        try{
            const sent = await this.emailService.sendEmailWithFileSystemLogs( to );

            if( !sent ) {
                throw new Error( 'Email not sent');
            }

        }catch(error){

            const log = new LogEntity( {
                message: 'Error sending email',
                level: LogSeverityLevel.HIGH,
                origin: 'send-email-logs.ts'
            } );

            this.logRepository.saveLog( log );

            return false;
        }
        return true;
    }
}
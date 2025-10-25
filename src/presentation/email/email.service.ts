
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface Attachment {
    filename: string;
    path: string;
}

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]; 
}


export class EmailService {

    constructor() { }
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions ): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try{
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            return true;
        }catch(error){
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ): Promise<boolean> {
        const subject = 'Logs de sistema - NOC System';
        const htmlBody = `
        <h3>Test - NOC System - Los del Servicio</h3>
        <a href="#">Ver archivos de logs</a>
        `;

        const attachments: Attachment[] = [ 
            { filename: 'all.log', path: './logs/all.log' },
            { filename: 'errors-high.log', path: './logs/logs-high.log' }
        ];
        
        return await this.sendEmail( { to, subject, htmlBody, attachments } );
    }
}

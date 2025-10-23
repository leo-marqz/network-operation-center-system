
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    //todo: attachments?: any[];
}

//todo: Attachment

export class EmailService {
    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions ): Promise<boolean> {
        const { to, subject, htmlBody } = options;
        try{
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            });

            return true;
        }catch(error){
            return false;
        }
    }
}

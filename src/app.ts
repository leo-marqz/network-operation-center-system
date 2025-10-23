
import { envs } from './config/plugins/envs.plugin';
import { EmailService } from './presentation/email/email.service';

import { Server} from './presentation/server';

(async ()=>{
    await main();
})();

async function main(){
    const url: string = 'https://www.google.com';

    const emailService = new EmailService();

    emailService.sendEmail({
        to: 'leomarqz2020@gmail.com',
        subject: 'Logs de sistema - NOC System',
        htmlBody: `
        <h3>Test - NOC System - Alerta de Servicio Desconectado</h3>
        <a href="#">Ver logs</a>
        `
    });
    
    Server.start(url);
}



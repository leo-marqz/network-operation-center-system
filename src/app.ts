
import { envs } from './config/plugins/envs.plugin';
import { EmailService } from './presentation/email/email.service';

import { Server} from './presentation/server';

(async ()=>{
    await main();
})();

async function main(){
    const url: string = 'https://www.google.com';

    const emailService = new EmailService();

    // emailService.sendEmailWithFileSystemLogs( ['leomarqz2020@gmail.com', 'leomarqz.main@gmail.com'] );
    
    Server.start(url);
}



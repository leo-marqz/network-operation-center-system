
import { envs } from './config/plugins/envs.plugin';
import { EmailService } from './presentation/email/email.service';

import { Server} from './presentation/server';

(async ()=>{
    await main();
})();

async function main(){
    const url: string = 'https://www.google.com';
    Server.start(url);
}




import { envs } from './config/plugins/envs.plugin';

import { Server} from './presentation/server';

(async ()=>{
    await main();
})();

async function main(){
    const url: string = 'https://www.google.com';

    // console.log({ environment: envs.ENVIRONMENT, port: envs.PORT, mailerEmail: envs.MAILER_EMAIL });

    Server.start(url);
}



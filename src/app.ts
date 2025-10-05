import { Server} from './presentation/server';

(async ()=>{
    await main();
})();

async function main(){
    const url: string = 'http://localhost:3000/comments';
    Server.start(url);
}



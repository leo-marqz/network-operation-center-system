
import color from 'picocolors';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

export class CheckService  implements CheckServiceUseCase {

    public async execute(url: string ): Promise<boolean> {
        try {
            const request = await fetch(url);
            if(!request.ok){
                throw new Error(`Error on check service ${url}`);
            }
            console.log( `${color.green('[OK]')} ${url}` );
        } catch (error) {
            console.log( color.red(`[ERROR]`) );
            console.log( error );
            return false;
        }

        return true;
    }

}


import color from 'picocolors';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService  implements CheckServiceUseCase {

    constructor(
        private readonly SuccessCallback: SuccessCallback,
        private readonly ErrorCallback: ErrorCallback
    ){}

    public async execute(url: string ): Promise<boolean> {
        try {
            const request = await fetch(url);
            if(!request.ok){
                throw new Error(`Error on check service ${url}`);
            }
            this.SuccessCallback();
        } catch (error) {
            this.ErrorCallback(url);
            return false;
        }
        return true;
    }

}

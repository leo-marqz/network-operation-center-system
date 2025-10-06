
import color from 'picocolors';
import { LogRepository } from '../../repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService  implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly SuccessCallback: SuccessCallback,
        private readonly ErrorCallback: ErrorCallback
    ){}

    public async execute(url: string ): Promise<boolean> {
        try {
            const request = await fetch(url);

            if(!request.ok){
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(`Service ${url} is up`, LogSeverityLevel.LOW);
            this.logRepository.saveLog( log );
            this.SuccessCallback();

            return true;
        } catch (error) {

            const log = new LogEntity(`Service ${url} is down: ${error}`, LogSeverityLevel.HIGH);
            this.logRepository.saveLog( log );

            this.ErrorCallback(url);

            return false;
        }
    }

}

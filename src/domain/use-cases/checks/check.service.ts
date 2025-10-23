
import color from 'picocolors';
import { LogRepository } from '../../repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback   = ((error: string) => void) | undefined;

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

            const log = new LogEntity( { message: `Service ${url} is up`, level:  LogSeverityLevel.LOW, origin: 'check.service.ts' } );
            this.logRepository.saveLog( log );

            if(this.SuccessCallback){
                this.SuccessCallback();
            }

            return true;
        } catch (error) {

            const log = new LogEntity( { message: `Service ${url} is down`, level: LogSeverityLevel.HIGH, origin: 'check.service.ts' } );
            this.logRepository.saveLog( log );

            if(this.ErrorCallback){
                this.ErrorCallback(url);
            }

            return false;
        }
    }

}

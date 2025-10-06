import { LogDatasource } from "../datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export class LogRepository implements LogDatasource {

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}

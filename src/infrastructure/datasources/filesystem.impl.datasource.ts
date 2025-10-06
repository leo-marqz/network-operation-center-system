import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

import fs from 'fs';

export class FileSystemDatasourceImpl implements LogDatasource {

    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = 'logs/all.log';
    private readonly lowLogsPath: string = 'logs/logs-low.log';
    private readonly mediumLogsPath: string = 'logs/logs-medium.log';
    private readonly highLogsPath: string = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = ()=>{
        if( !fs.existsSync( this.logPath ) ){
            fs.mkdirSync( this.logPath );
        }

        [   this.allLogsPath, 
            this.lowLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath
        ].forEach( ( path: string )=>{
            if( !fs.existsSync( path ) ){
                fs.writeFileSync( path, '' ); 
            }
        });
    }

    private getLogsFromFile = (path: string): LogEntity[] =>{
        
        const content = fs.readFileSync( path, 'utf-8' );
        
        const logs: LogEntity[] = content.split('\n').map((log)=>{
            return LogEntity.fromJson(log);
        });

        return logs;

    };

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = JSON.stringify(log);

        fs.appendFileSync( this.allLogsPath, `${logAsJson}\n`);

        switch(log.level){
            case LogSeverityLevel.LOW:
                fs.appendFileSync( this.lowLogsPath, `${logAsJson}\n`);
                break;
            case LogSeverityLevel.MEDIUM:
                fs.appendFileSync( this.mediumLogsPath, `${logAsJson}\n`);
                break;
            case LogSeverityLevel.HIGH:
                fs.appendFileSync( this.highLogsPath, `${logAsJson}\n`);
                break;
            default:
                throw new Error(`Invalid log severity level: ${log.level}`);
        }

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.LOW:
                return this.getLogsFromFile(this.lowLogsPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`Invalid log severity level: ${severityLevel}`);
        }
    }


}





export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    origin?: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    public createdAt: Date;


    constructor( options: LogEntityOptions ){
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = new Date();
        this.origin = origin || 'unknown';
    }
    
    static fromJson(json: string): LogEntity{

        const { message, level, createdAt, origin } = JSON.parse(json);

        if( !message) throw new Error('Message is required');
        if( !level) throw new Error('Level is required');
        if( !createdAt) throw new Error('Created at is required');

        const log = new LogEntity( {
            message: message,
            level: level,
            origin: origin || 'log.entity.ts',
            createdAt: createdAt 
        } );

        return log;
        
    }

}




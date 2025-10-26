
import mongoose from 'mongoose';
import color from 'picocolors';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    constructor(){}

    static async connect(options: ConnectionOptions){
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect( mongoUrl, { dbName: dbName } );
            console.log(`${color.green('OK')} Mongo connected!`);
        } catch (error) {
            console.log(`${color.red('DANGER')} Mongo connection error!`);
            throw error;
        }
    }
}


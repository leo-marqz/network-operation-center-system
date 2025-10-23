
// para cargar las variables de entorno desde el archivo .env
import 'dotenv/config';

// para agregar validaciones a las variables de entorno
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').default('3000').required().asPortNumber(),
    ENVIRONMENT: env.get('ENVIRONMENT').default('development').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),  
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString()
}










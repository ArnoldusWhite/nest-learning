export const appConfig = () => ({
    environments: process.env.NODE_ENV || 'production',
    database:{
        host: process.env.DATABASE_HOST,
        port:parseInt(process.env.DATABASE_PORT!) || 5432,
        user: process.env.DATABASE_USERNAME ,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        synchronize: process.env.DATABASE_SYNCH === 'true' ? true : false,
        autoloadEntities: process.env.DATABASE_AUTOLOAD_ENTITIES === 'true' ? true : false,
    }
})
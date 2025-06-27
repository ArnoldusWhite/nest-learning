import { registerAs } from "@nestjs/config";


export default registerAs('envConfig', () => ({
    environments: process.env.NODE_ENV || 'production',
}));
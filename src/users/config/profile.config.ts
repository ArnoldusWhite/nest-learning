import { registerAs } from "@nestjs/config";

/**
 * This config will only be available in the UsersModule
 * Profile configuration for the application.
 * This configuration is used to set the API key for profile-related operations.


 */
export default registerAs('profileConfig', () => ({
    apikey : process.env.PROFILE_API_KEY,
}));
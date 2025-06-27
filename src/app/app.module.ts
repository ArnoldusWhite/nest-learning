import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsModule } from 'src/meta-options/meta-option.module';
import { TagsModule } from 'src/tags/tags.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import envConfig from 'src/config/env.config';
import databaseConfig from 'src/config/database.config';
import environmentValidation from 'src/config/environment.validation';



// This is the main module of the application, it imports all the other modules and sets up the database connection
// It also sets up the configuration module to load environment variables from a .env file

const ENV = process.env.NODE_ENV; // Default to development if NODE_ENV is not set
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env.development', // Specify the path to your .env file
      load: [envConfig, databaseConfig], // Load the appConfig function to get configuration values
      validationSchema: environmentValidation, // Validate the environment variables against the schema
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    TagsModule,
    //Need to check forRoot & forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService)=> ({
        type: 'postgres',
        entities: [],
        //configuration from the app.config.ts file
        //this will autoload entity present in the module definition by using TypeOrmModule.forFeature(), no need to specify entities here
        autoLoadEntities: configService.get('database.autoloadEntities'),
        synchronize:configService.get('database.synchronize'), // Will delete and create a new database at each launch
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        host: configService.get<string>('database.host'),
        database: configService.get<string>('database.name'),
      })
      
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

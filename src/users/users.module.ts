import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';
import { UsersCreateManyService } from './providers/users-create=many.service';


@Module({
    controllers:[UsersController],
    //Tell the module to load this provider
    providers:[UsersService,UsersCreateManyService],
    exports:[UsersService],
    imports:[
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]), 
        ConfigModule.forFeature(profileConfig)]
})
export class UsersModule {}

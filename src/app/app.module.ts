import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsModule } from 'src/meta-options/meta-option.module';
import { TagsModule } from 'src/tags/tags.module';


@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionsModule,
    TagsModule,
    //Need to check forRoot & forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [],
      inject:[],
      useFactory: ()=> ({
        type: 'postgres',
        entities: [],
        //this will autoload entity present in the module definition by using TypeOrmModule.forFeature(), no need to specify entities here
        autoLoadEntities: true,
        synchronize: true, // Will delete and create a new database at each launch
        port: 5432,
        username: 'postgres',
        password: 'Groot@1234isgood',
        host: 'localhost',
        database: 'nestjs-blog'
      })
      
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

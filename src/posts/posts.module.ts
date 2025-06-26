
import { Module } from "@nestjs/common";
import { PostController } from "./posts.controller";
import { PostsService } from "./providers/posts.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { UsersService } from "src/users/providers/users.service";
import { TagsModule } from "src/tags/tags.module";

@Module({
    controllers:[PostController],
    providers:[PostsService],
    imports:[UsersModule,TagsModule,TypeOrmModule.forFeature([Post, MetaOption])],
})
export class PostsModule {

}
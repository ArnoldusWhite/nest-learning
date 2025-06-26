import { Module } from "@nestjs/common";
import { TagsController } from "./tags.controller";
import { TagsService } from "./providers/tags.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./tag.entity";
import { PostsModule } from "src/posts/posts.module";

@Module({
    controllers:[TagsController],
    providers: [TagsService, ],
    imports: [TypeOrmModule.forFeature([Tag])],
    exports: [TagsService]
})
export class TagsModule{

}
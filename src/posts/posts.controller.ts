import { Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./providers/posts.service";


//http://localhost:3300/posts

@Controller('posts')
export class PostController{

    constructor(
        /**
         * Injecting Post Service
         */
        private readonly postsService: PostsService){

    }



    @Get()
    public getPosts(){

    }

    @Get('{/:userId}')
    public getPostsByUserId(
        @Param('userId') userId: string
    ){
        return this.postsService.findAll(userId);
    }

    @Post()
    public createPosts(){

    }

    @Patch()
    public patchPost(){

    }

}
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { PostsService } from "./providers/posts.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePostParamDto } from "./dtos/create-post-param.dto";
import { PatchPostDto } from "./dtos/patch-post.dto";

//http://localhost:3300/posts

@Controller('posts')
@ApiTags('Posts')
export class PostController{

    constructor(
        /**
         * Injecting Post Service
         */
        private readonly postsService: PostsService){

    }



    @ApiOperation({
        summary:'Create a new blog post'
    })
    @ApiResponse({
        status:200,
        description:'You get a 201 response if your post is created successfully'

    })
    @Post('create')
    public createPost(
        @Body() createPost: CreatePostParamDto,
    ){
        return this.postsService.createPost(createPost);
    }


     @Get('all')
    public getAllPost(){
        return this.postsService.getAllPosts();
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

    //Delete a post base on his ID
    @Delete()
    public deletePost(
        @Query('id', ParseIntPipe) id: number
    ){
        return this.postsService.deletePost(id);
    }

    @ApiOperation({
        summary: "Update an user by is ID"
    })
    @ApiResponse({
        status:200,
        description: 'A 200 response if the post is updated successfully'
    })
    @Patch()
    public updatePost( @Body() patchPostDto : PatchPostDto){
        return this.postsService.patchPost(patchPostDto);
    }

}
import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TagsService } from "./providers/tags.service";
import { CreateTagsParamDto } from "./dto/create-tags-param.dto";


@Controller('tags')
@ApiTags('Tags')
export class TagsController{

    constructor(
        
        private readonly tagService: TagsService,
    ){}

    @ApiOperation({
        summary: 'create a new tag'
    })
    @Post()
    public CreateTags(@Body() createTagDto: CreateTagsParamDto){
        return this.tagService.createTag(createTagDto);
    }

    @Get()
    public getTags(){
        return this.tagService.getAllTags();
    }

    @Delete()
    public async deleteTag(
        @Query('id', ParseIntPipe) id: number
    ){
        return this.tagService.deleteTag(id);
    }


    @Delete('soft')
    public async softDeleteTag(
        @Query('id', ParseIntPipe) id: number
    ){
        return this.tagService.softDeleteTag(id);
    }

}
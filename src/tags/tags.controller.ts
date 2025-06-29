import { Body, Controller, Delete, Get, ParseArrayPipe, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TagsService } from "./providers/tags.service";
import { CreateTagsParamDto } from "./dto/create-tags-param.dto";
import { FindTagsParamDto } from "./dto/find-tags-param.dto";


@Controller('tags')
@ApiTags('Tags')
export class TagsController{

    constructor(
        
        private readonly tagService: TagsService,
    ){}


    @Post('multiple')
    public async  getMultipleTags(
        @Body() tags: FindTagsParamDto){

            let tagsId: number[] =  Array.from(tags.tagsArray);
            console.log('Tags ID', tagsId.length);
            console.log(tagsId);

            //If the tags is an array of numbers, we can use it directly
            /**
             * if(Array.isArray(tags)){
                tagsId = tags;
                console.log('Inside if. Tags ID', tagsId.length);
            }
             */
            
        
        return this.tagService.findMultiple(tagsId);
    }

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
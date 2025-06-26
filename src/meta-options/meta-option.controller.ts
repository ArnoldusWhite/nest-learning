import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MetaOption } from "./meta-option.entity";
import { MetaOptionService } from "./providers/meta-option.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatePostMetaOptionDto } from "./dtos/create-post-meta-options.dto";
import { GetMetaOptionParamDto } from "./dtos/get-meta-option-param.dto";

@Controller('meta-options')
@ApiTags('MetaOption')
export class MetaOptionController{

    constructor(
        private readonly MetaOptionService: MetaOptionService
    ){

    }
    

    @ApiOperation({
        summary:'This function will create a new MetaOption'
    })
    @ApiResponse({
        status: "2XX",
        description: 'Meta-option created successfully'
    })
    @Post('create')
    public CreateMetaOption(
        @Body() metaOption: CreatePostMetaOptionDto
    ){
        return this.MetaOptionService.createMetaOption(metaOption);
    }

    @Get('/all')
    public getAllMetaOption(){
        return this.MetaOptionService.allMetaOptions();
    }

    @ApiOperation({
        summary:'Fetches a list of registered users on the application'
    })
    @Get('{/:id}')
    public FindAllMetaOption(
        @Param('id') MetaOptionID: GetMetaOptionParamDto,
    ){
        return this.MetaOptionService.findAll(MetaOptionID);
    }

    

}
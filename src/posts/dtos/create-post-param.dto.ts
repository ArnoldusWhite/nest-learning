import { IsArray, IsDate, IsEnum, IsInt, IsISO8601, isJSON, IsJSON, IsNotEmpty, IsOptional, isString, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { postType } from "./postEnum";
import { statusType } from "./statusEnum";
import { CreatePostMetaOptionDto } from "src/meta-options/dtos/create-post-meta-options.dto";

export class CreatePostParamDto{

   
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(512)
    @ApiProperty({
        description:'define a post title',
        example:'title X',
    })
    title: string;

    
    @ApiProperty({
        description:'define the type of a post',
        example:'The possible values are post, page, story, series',
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url" '
    })
    @ApiProperty({
        description: 'the post URL path',
        example: '/postxxx3',
    })
    slug: string;

    @IsString()
    @MinLength(5)
    @ApiProperty({
        description:"define the status of the post",
        example: 'The possible values can be draft, scheduled, review, published',
    })
    status: statusType;
    
    @ApiPropertyOptional({
        description: 'the content of the post',
        example:'the content of the post',
    })
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description:"Define the schema of the post",
        example:'xxxx',
    })
    @IsJSON()
    @IsOptional()
    schema?: string;

    @ApiPropertyOptional({
        description:'define an image illustration url for the post ',
        example:'http://image.com/post.img',
    })
    @MaxLength(1024)
    @IsUrl()
    @IsOptional()
    featureImageUrl?: string;

    @ApiPropertyOptional({
        description:'define the post publication date',
        example:''
    })
    @IsOptional()
    @IsISO8601()
    publishOn: Date;

    @ApiProperty({
        description:'Array of Id of Tags',
        example:"['item1','item2','item3']"
    })
    @IsArray()
    // each : true will make sure each value is tested to be string
    @IsInt({ each: true})
    tags?: number[];
      
     
    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type : 'object',
            properties:{
                metaValue: {
                    type: 'json',
                    description: 'The metaValue is a JSON string',
                    example: 'sidebarEnabled'
                }
            }
        },
        example: "[{'key':'value'},{'key':'value'}]"
    })
    @IsOptional()
    @ValidateNested({ each: true})
    @Type(()=> CreatePostMetaOptionDto)
    metaOptions?: CreatePostMetaOptionDto ;


    @ApiProperty({
        type: 'integer',
        required: true,
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    authorId: number;




    
}


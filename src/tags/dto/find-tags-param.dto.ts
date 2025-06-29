import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";

export class FindTagsParamDto{
    
    @ApiProperty({
        description:'Array of Id of Tags',
        example:"['item1','item2','item3']"
    })
    @IsArray()
    // each : true will make sure each value is tested to be string
    @IsInt({ each: true})
    tagsArray: number[];
}
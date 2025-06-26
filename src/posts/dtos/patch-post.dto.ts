import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePostParamDto } from "./create-post-param.dto";
import { IsInt, IsNotEmpty } from "class-validator";
//import { PartialType } from "@nestjs/mapped-types";


//PartialType from swagger will pick all property from this class and the parent class to display it at the level of the API doc
//PartialType from mapped-types will only display the property in this class
export class PatchPostDto extends PartialType(CreatePostParamDto){

    @ApiProperty({
        description:"The ID of the post that needs to be updated"
    })
    @IsInt()
    @IsNotEmpty()
    id : number

}
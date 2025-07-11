import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional } from "class-validator";

export class GetPostsParamDto{

    @IsOptional()
    @IsInt()   
    @Type(()=>Number)
    id?: number;    

}
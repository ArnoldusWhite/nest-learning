import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class GetMetaOptionParamDto{

    @ApiPropertyOptional({
        type: 'number',
        description: 'Get the meta-option with the specified ID',
        example: 23
    })
    @IsOptional()
    @IsInt()
    @Type(()=> Number)
    id: number;
}
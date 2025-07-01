import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-dto";
import { ApiProperty } from "@nestjs/swagger";

export class UsersCreateManyDto {

    @ApiProperty({
        description: 'List of users to be created',
        type: 'array',
        items: {
            type: 'User',
            $ref: '#/components/schemas/CreateUserDto'
        },
        required: true
    })
    @IsNotEmpty({ each: true })
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => CreateUserDto)
    usersList: CreateUserDto[];
}
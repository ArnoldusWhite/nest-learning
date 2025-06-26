import {
    IsEmail,
     IsNotEmpty, 
     IsString, 
     Matches,
     MaxLength, 
     MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(99)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(99)
    lastName? : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(99)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(99)
    @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/,{
        message :'Minimum 8 characters, at least one letter, one number and one special character'
    })
    password: string;
}
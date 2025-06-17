import { Controller, 
    Get, 
    Post, 
    Patch, 
    Put, 
    Delete, 
    Param, 
    Query,
    Body ,
    //from ExpressJs
    Req,
    Headers,
    Ip,
    ParseIntPipe,
    DefaultValuePipe,
    ValidationPipe, 
} from "@nestjs/common";
import { Request } from "express";
import { CreateUserDto } from "./dtos/create-dto";
import { GetUsersParamDto } from "./dtos/get-users-param.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";
import { UsersService } from "./providers/users.service";
import { AuthService } from "src/auth/providers/auth.service";
import { GetPostsParamDto } from "src/posts/dtos/get-post-param.dto";

//http://localhost:3300/users

@Controller('users')
export class UsersController {
    constructor(
        //Injecting Users Service
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ){}

    /*
     * The ID is optional in this request. 
     * The endpoint should also accept limit and offset as query param
    */
    @Get('{/:id}')
    public getUsers(
        @Param() GetUserParamDto: GetUsersParamDto, 
        @Query('limit',new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('offset', new DefaultValuePipe(1), ParseIntPipe) offset: number,
    ){
        //console.log(typeof id);
        //console.log( typeof limit + ' '+ limit);
        //console.log(GetUserParamDto);
        console.log(this.authService.isConnected("23"))
        return this.usersService.findAll(GetUserParamDto,limit,offset);
    }

    @Post()
    public createUsers(
        @Body() createUserDto: CreateUserDto,
    ){
        console.log(createUserDto);
        console.log( createUserDto instanceof CreateUserDto );
        return "You send a post request to create a user";
    }

    //using express JS
    @Post('createExpress')
    public createUsers2(
        @Req() request: Request, 
        @Headers() headers: any,
        @Ip() ip: any){
        console.log(request);
        console.log(headers);
        console.log(ip);
        return "You send a post request to create a user";
    }

    @Patch()
    public patchUser(
        @Body() patchUserdto : PatchUserDto
    ){
        return patchUserdto;
    }

    


}
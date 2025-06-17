import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";


@Injectable()
export class UsersService{

    constructor(
           @Inject(forwardRef(() => AuthService)) private  authService: AuthService
        ){}

    public findAll(
        GetUserParamDto: GetUsersParamDto,
        limit: number,
        offset:number){
        
        const isAuth = this.authService.isAuth();
        console.log(isAuth
            
        )
        return [
            {
                firstName:'John',
                email:'abayema123@gmail.com'
            },
            {
                firstName:'Alice',
                email:'abayema@gmail.com'
            }
        ]
    }

    /**
     * Find a user by ID
     */
    public findOneById(id: string){
        return {
            id:1234,
            firstName:'Arnold',
            email:'abayema123@gmail.com'
        }
    }

}
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";


@Injectable()
export class AuthService{

    constructor(
       @Inject(forwardRef(() => UsersService)) private readonly  userService: UsersService
    ){}

    public isConnected(userId: string){
        return "The user "+ userId + " is connected";
    }

    public login(email: string, password: string, id: string){
        //Check if the user exist in the database
        //login
        //return a token

        const user = this.userService.findOneById("1234");
        return "SAMPLE_TOKEN";
    }

    public isAuth(){
        return true;
    }

}
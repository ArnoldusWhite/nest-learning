import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";


@Injectable()
export class PostsService{
    constructor(
        /**
         * Injecting usersService
         */
        private readonly usersService: UsersService,
    ){}

    public findAll(userId: string){
        //User service
        //Find a user
        const user = this.usersService.findOneById(userId);

        //return Posts if the user exist
        return [
            {
                user: user,
                title:'test title',
                content:'Test content',
            },
            {
                user:user,
                title:'test title2',
                content:'Test content2',
            },
        ]

        //console.log(userId);
    }
}
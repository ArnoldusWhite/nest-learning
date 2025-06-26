import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-dto";


@Injectable()
export class UsersService{

    constructor(
        // relation between the AuthModule and this UserService
           @Inject(forwardRef(() => AuthService)) private  authService: AuthService,
           /**
            * Injecting userRepository
            */
           @InjectRepository(User)
           private usersRepository: Repository<User>
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
    public async findOneById(id: number){
        return await this.usersRepository.findOneBy({
            id,
        })
    }

    /**
     * Create a new user
     * @param user 
     * @returns 
     */
    public async createUser(user: CreateUserDto){
        // Check if the user exists with the same email
        const existingUsers = await this.usersRepository.findOne({
            where: { email: user.email}
        })
        //handle exception
        try {
            
        } catch (error) {
            
        }
        //create a new user
        let newUser = this.usersRepository.create(user);
        newUser = await this.usersRepository.save(newUser);

        return newUser;
        
    }

}
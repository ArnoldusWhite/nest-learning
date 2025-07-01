import { Injectable, Inject, forwardRef, RequestTimeoutException, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { DataSource, Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";
import { get } from "http";
import { error } from "console";
import { UsersCreateManyService } from "./users-create=many.service";
import { UsersCreateManyDto } from "../dtos/create-multiple-users.dto";


@Injectable()
export class UsersService{

    constructor(
        // relation between the AuthModule and this UserService
           @Inject(forwardRef(() => AuthService)) private  authService: AuthService,
           /**
            * Injecting userRepository
            */
           @InjectRepository(User)
           private usersRepository: Repository<User>,
           /**
            * Injecting configService
            */
           private readonly configService: ConfigService,
           /**
            * Inject the apiKeyConfig
            */
           @Inject(profileConfig.KEY)
           private readonly apiKeyConfig: ConfigType<typeof profileConfig>,
           /**
            * Inject DataSource
            */
           private readonly dataSource: DataSource,
           /**
            * Inject CreateManyUsersService 
            */
           private readonly usersCreateManyService: UsersCreateManyService,
        ){}

    public async findAll(
        GetUserParamDto: GetUsersParamDto,
        limit: number,
        offset:number){

        let result;
        const environment = this.configService.get<string>('S3_BUCKET');
        //console.log(`The environment is ${environment}`);
        //console.log(`The api key is ${this.apiKeyConfig}`);
        //console.log(this.apiKeyConfig.apikey);
        //const isAuth = this.authService.isAuth();
        //console.log(isAuth)

        if(GetUserParamDto.id){
            
            try {
                result = await this.usersRepository.findOneBy({
                    id: GetUserParamDto.id, 
                });
            } catch (error) {
                throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
                {
                    description: 'Error connecting to the database'
                },)
            }

            //If the user does not exist, throw an error
            if(!result){
                throw new BadRequestException(
                    'User not found, please check your ID',
                    {
                        description: 'A user with the given ID does not exist'
                    },
                )
            }
        }else{
            try {
                result = await this.usersRepository.find({
                    take: limit,
                });
            } catch (error) {
                throw new RequestTimeoutException(
                    'Unable to process your request at the moment, please try again later', 
                    {
                    description: 'Error connecting to the database'
                    },
                )
            }
        }
         return result;

    }


    //example of a method where we handle custom exceptions
    public findAllUsers(){
        throw new HttpException(
            {
            status: HttpStatus.MOVED_PERMANENTLY,
            error:'API endpoint does not exist',
            fileName: 'users.service.ts',
            line:92,
             },
            HttpStatus.MOVED_PERMANENTLY,
            {
                description: 'Occured because the api endpoint was moved'
            }
        );
    }

    /**
     * Find a user by ID
     */
    public async findOneById(id: number){

        let user;
        //handle exception
        try {
            user = await this.usersRepository.findOneBy({
                id,
            })
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
                {
                    description: 'Error connecting to the database'
                },
            )
        }
        //If the user does not exist, throw an error
        if(!user){
            throw new BadRequestException(
                'User not found, please check your ID',
                {
                    description: 'A user with the given ID does not exist'
                },
            )
        }

        return user;
    }

    /**
     * Create a new user
     * @param user 
     * @returns 
     */
    public async createUser(user: CreateUserDto){
        let existingUser;
        // Check if the user exists with the same email
        
        //handle exception
        try {
           existingUser =  await this.usersRepository.findOne({
                where: { email: user.email}
            })
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
                {
                    description: 'Error connecting to the database'
                },
            )
        }
        //If the user exists, throw an error
        if(existingUser){
            throw new BadRequestException(
                'User already exists, please check your email',
                {
                    description: 'A user with the same email already exists'
                },
            )
        }

        //create a new user
        let newUser;
        newUser = this.usersRepository.create(user);
        try {
            newUser = await this.usersRepository.save(newUser);
            
        } catch (error) {
            throw new RequestTimeoutException(
                error.message || 'Unable to process your request at the moment, please try again later',
                {
                    description: 'Error connecting to the database'
                }
            )
        }
        
        return newUser;
        
    }

    public async createMultipleUsers(users: UsersCreateManyDto){
        return await this.usersCreateManyService.createMultipleUsers(users);
    }

}
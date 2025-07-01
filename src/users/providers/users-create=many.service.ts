import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import  { User } from "../user.entity";
import { CreateUserDto } from "../dtos/create-dto";
import { BadRequestException, HttpException, RequestTimeoutException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { UsersCreateManyDto } from "../dtos/create-multiple-users.dto";

@Injectable()
export class UsersCreateManyService{

    constructor(
        /**
                    * Inject DataSource
                    */
                   private readonly dataSource: DataSource,
    ){

    }


    public async createMultipleUsers(users: UsersCreateManyDto){
            let newUserList: User[] = [];
            let existingUser;
            //Create Query runner Instance
            const queryRunner = this.dataSource.createQueryRunner()
           
           try {
            //Connect Query runner to the instance
            await queryRunner.connect();
            //Start transaction
            await queryRunner.startTransaction();
           } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
                {
                    description: 'Unabale to connect to the database'
                }
                    
            )
           }
            
            try {
                for(const user of users.usersList){
                    //Check if the user exists with the same email
                    existingUser = await queryRunner.manager.findOne(User, {
                        where: { email: user.email }
                    });
    
                    //If the user exists, throw an error
                    if(existingUser){
                        throw new BadRequestException(
                            'User already exists, please check your email',
                            {
                                description: 'A user with the same email already exists'
                            },
                        );
                    }
    
                    //create a new user
                    const newUser = queryRunner.manager.create(User, user);
                    let result = await queryRunner.manager.save(newUser);
    
                    newUserList.push(result);
                }
    
                //if Successful commit
                await queryRunner.commitTransaction(); //commit the transaction
            } catch (error) {
                //if error rollback
                await queryRunner.rollbackTransaction(); //rollback the transaction
                throw new HttpException(
                    {
                    status: HttpStatus.CONFLICT,
                    error:'Unable to process your request at the moment, please try again later: ' + error.message,
                    line:29,

                    },
                    HttpStatus.CONFLICT,
                    {
                        description: 'Occured because the database is not responding',
                        cause: error.message || 'Error connecting to the database',
                    }
                 );
            } finally{
                //Release connection
                try {
                    await queryRunner.release();
                } catch (error) {
                    throw new RequestTimeoutException('Could not release the connection',{
                        description: error.message
                    })
                }
                
            }
    }
}
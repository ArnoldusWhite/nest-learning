import { Controller, Get } from "@nestjs/common";


//
@Controller('auth')
export class AuthController{

    @Get('/{:userId}')
    public isConnected(){
        
    }

}
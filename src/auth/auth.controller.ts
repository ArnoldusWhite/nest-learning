import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

//

@Controller('auth')
@ApiTags('Auth')
export class AuthController{

    @Get('/{:userId}')
    public isConnected(){
        
    }

}
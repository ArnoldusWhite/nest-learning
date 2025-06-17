import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { UsersModule } from "src/users/users.module";
import { forwardRef } from "@nestjs/common";


@Module({
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService],
    imports:[forwardRef(() => UsersModule)]
})
export class AuthModule{

}
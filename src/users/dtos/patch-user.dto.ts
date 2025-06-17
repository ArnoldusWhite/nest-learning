import { CreateUserDto } from "./create-dto";
import { PartialType} from "@nestjs/swagger"


export class PatchUserDto extends PartialType(CreateUserDto){

  
}
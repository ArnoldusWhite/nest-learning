import { Module } from "@nestjs/common";
import { MetaOptionController } from "./meta-option.controller";
import { MetaOptionService } from "./providers/meta-option.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaOption } from "./meta-option.entity";

@Module({
     
     imports:[TypeOrmModule.forFeature([MetaOption])],
     controllers: [MetaOptionController],
     providers: [MetaOptionService],
})
export class MetaOptionsModule {

}
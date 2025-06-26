import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { MetaOption } from "../meta-option.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostMetaOptionDto } from "../dtos/create-post-meta-options.dto";
import { GetMetaOptionParamDto } from "../dtos/get-meta-option-param.dto";

@Injectable()
export class MetaOptionService{


    constructor(
        @InjectRepository(MetaOption)
        private MetaOptionRepository: Repository<MetaOption>
    ){}

    public async createMetaOption(MetaOption: CreatePostMetaOptionDto){

        let newMetaOption = this.MetaOptionRepository.create(MetaOption);
        newMetaOption = await this.MetaOptionRepository.save(newMetaOption);

        return newMetaOption;
    }

    /**
     * let newUser = this.usersRepository.create(user);
        newUser = await this.usersRepository.save(newUser);
     */

    public findAll(id : GetMetaOptionParamDto){
        let metaId: number; 
        return (typeof id.id !== "undefined")?  this.MetaOptionRepository.find() : this.MetaOptionRepository.findOne(id.id)
        //return (typeof GetMetaOptionParamDto. !== "undefined") ? null : t
        
    }


    public allMetaOptions(){
        return this.MetaOptionRepository.find();
    }
}
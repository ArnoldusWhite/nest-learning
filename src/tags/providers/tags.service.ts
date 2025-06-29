import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../tag.entity";
import { In, Repository } from "typeorm";
import { CreateTagsParamDto } from "../dto/create-tags-param.dto";
import { PostsService } from "src/posts/providers/posts.service";

@Injectable()
export class TagsService {

    constructor(
         @InjectRepository(Tag)
         private readonly tagsRepository: Repository<Tag>
    ){}


    public async getAllTags(){
        return this.tagsRepository.find();
    }

    public async createTag(createTagDto: CreateTagsParamDto){

        let tag = this.tagsRepository.create(createTagDto);
        return await this.tagsRepository.save(tag);
    }

    public async findMultiple(tagsId: number[]){
        

        let result = await this.tagsRepository.find({
            where: {
                id: In(tagsId)
             }
        });
        
        return result;
    }

    public async deleteTag(id: number){
        return await this.tagsRepository.delete(id);
    }

    public async softDeleteTag(id: number){
        return await this.tagsRepository.softDelete(id);
    }


}
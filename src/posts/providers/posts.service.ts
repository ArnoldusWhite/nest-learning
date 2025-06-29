import { BadRequestException, Body, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";
import { CreatePostParamDto } from "../dtos/create-post-param.dto";
import { Repository } from "typeorm";
import { Post } from "../post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { TagsService } from "src/tags/providers/tags.service";
import { PatchPostDto } from "../dtos/patch-post.dto";


@Injectable()
export class PostsService{
    constructor(
        /**
         * Injecting usersService
         */
        private readonly usersService: UsersService,
        /**
         * Injecting the TagService
         */
        private readonly tagsService: TagsService,
        /**
         * Injecting PostRepository
         */
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        /**
         * Injecting MetaOptionRepository
         */
        @InjectRepository(MetaOption)
        private readonly metaOptionrepository: Repository<MetaOption>
    ){}


    public async getAllPosts(){
       
       //to load the nested object metaOptions or we can add eager at the level of the entity relation declaration
        let posts = await this.postRepository.find({
            relations: {
                metaOptions: true,
                author: true,
                tags: true,
            }
        });
        return posts;
        

       //let posts = await this.postRepository.find();
       //return posts;
    }

    public async patchPost(patchPostDto: PatchPostDto){
        //find the tags
        let tags;
        let post;
        let result;

        try {
            tags = await this.tagsService.findMultiple(patchPostDto.tags!)
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
            { description: 'Error connecting to the database' },)
        }

        //check if the tags are null
        if(tags.length === 0 || patchPostDto.tags?.length !== tags.length){
             throw new HttpException(
                        {
                        status: HttpStatus.BAD_REQUEST,
                        error:'Tags not found, please check the tags you provided',
                        fileName: 'posts.service.ts',
                        line:55,
                         },
                        HttpStatus.BAD_REQUEST,
                        {
                            description: 'Occured because the api endpoint was moved',
                            cause: 'Tags not found',

                        }
                    );
        }


        try {
            post = await this.postRepository.findOneBy({
                id: patchPostDto.id,
            });
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment, please try again later',
                { description: 'Error connecting to the database' },
            );
        }

        if(!post){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Post not found, please check the ID you provided',
                fileName: 'posts.service.ts',
                line: 86,
            }, HttpStatus.BAD_REQUEST, {
                description: 'A post with the given ID does not exist',
                cause: 'Post not found',
            });
        }
        
            //update the properties
            post.title = patchPostDto.title ?? post.title;
            post.content = patchPostDto.content ?? post.content;
            post.status = patchPostDto.status ?? post.status;
            post.postType = patchPostDto.postType ?? post.postType;
            post.slug = patchPostDto.slug ?? post.slug;
            post.publishOn = patchPostDto.publishOn ?? post.publishOn;
            post.featureImageUrl = patchPostDto.featureImageUrl ?? post.featureImageUrl;
            post.schema = patchPostDto.schema ?? post.schema;

            post.tags = tags; //assign the tags to the post
            try {
                result = await this.postRepository.save(post);
            } catch (error) {
                throw new RequestTimeoutException(
                    'Unable to process your request at the moment, please try again later',);
            }


        return result;



        /**
         * if (post !== null) {
            

            //assign the new tags
            if(tags !== null)
            post.tags = tags;

             //save the post and return
         return await this.postRepository.save(post);

         }
         */
        
         

    }

    public async deletePost(id: number){
        
        // Find the post to delete
        let post = await this.postRepository.findOneBy({ id });
        //find a post with Bi directional OneToOne relation
        let inversePost = await this.metaOptionrepository.find({
            where: {id: post?.metaOptions.id },
            relations :{
                post: true,
            }
        });

        console.log(inversePost);

        console.log("the post value is "+ post);
        let idmetaoption = post?.metaOptions;
        // delete the post
        await this.postRepository.delete(id);
        // delete the meta options
        console.log("metaOption id: " + post!.metaOptions.id); 
        await this.metaOptionrepository.delete(post?.metaOptions.id!)
        
        // confirmation

        return {deleted : true, id};

    }

    public findAll(userId: string){
        let idUser = parseInt(userId);
        //User service
        //Find a user
        const user = this.usersService.findOneById(5);

        //return Posts if the user exist
        return [
            {
                user: user,
                title:'test title',
                content:'Test content',
            },
            {
                user:user,
                title:'test title2',
                content:'Test content2',
            },
        ]

        //console.log(userId);
    }

    public async createPost(@Body() createPost: CreatePostParamDto ){
        //create the metaOptions
        /**
         * With cascade off.
         * let metaOptions = createPost.metaOptions ? this.metaOptionrepository.create(createPost.metaOptions) : null;
        if(metaOptions){
            await this.metaOptionrepository.save(metaOptions);
        }
        // create the Post
        //return createPost
        let newPost = this.postRepository.create(createPost);
        if(metaOptions){
            newPost.metaOptions = metaOptions;
        }
            return await this.postRepository.save(newPost);
         */

        /**
         * With cascade set as true
         */
       // let post = this.postRepository.create(createPost);
        //return await this.postRepository.save(post);

        //create a post with an existing author now
        //find author
        let author = await this.usersService.findOneById(createPost.authorId);

        //find tags
        let tags = await this.tagsService.findMultiple(createPost.tags!)
        //create the post
        let post2 = this.postRepository.create({
            ...createPost,// spread operator to copy all properties from createPost
            author: author!,
            tags: tags
        })

        return  await this.postRepository.save(post2);


            

    }
}
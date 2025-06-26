import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./dtos/postEnum";
import { statusType } from "./dtos/statusEnum";
import { Tag } from "src/tags/tag.entity";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 512
    })
    title: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    content?: string;

    @Column({
        nullable: false,
        type: 'varchar',
        length: 256,
        unique: true
    })
    slug: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: postType,
        default: postType.PAGE
    })
    postType: postType;


    @Column({
        nullable: false,
        type: 'enum',
        enum: statusType,
        default: statusType.DRAFT
    })
    status: statusType;

     @Column({
        nullable: true,
        type: 'text'
    })
    schema?: string;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 1024
    })
    featureImageUrl?: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    publishOn: Date;

    //Uni-directional ManyToMany relationship with Tag entity
    /**
     * @ManyToMany(() => Tag,{
        cascade: true,
    })
    @JoinTable()
    tags?: Tag[];
     */
    

    //Creating a Bi-directional ManyToMany relationship with Tag entity
    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    tags: Tag[];



   //Simple oneToOne relation
   /**
    * @OneToOne(()=> MetaOption, {
        //cascade: ['insert', 'remove'],
        cascade: true,
        //This will make sure the metaOption are also fetched when getting Posts
        eager: true,
    } )
    @JoinColumn()
    metaOptions: MetaOption;
    */
    


   //Bi-directional relation
    @OneToOne(()=> MetaOption, (metaOptions)=> metaOptions.post , {
        //cascade: ['insert', 'remove'],
        cascade: true,
        //This will make sure the metaOption are also fetched when getting Posts
        eager: true,
    } )
    @JoinColumn()
    metaOptions: MetaOption;

    @ManyToOne(()=> User, (user)=>user.posts)
    author: User;

}
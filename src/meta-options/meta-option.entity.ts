import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: true
    })
    metaValue: string;

    @CreateDateColumn()
    createDate: Date; 

    @UpdateDateColumn()
    updateDate: Date;

    // defining a Bi- directional OneToOne relationship
    @OneToOne(()=> Post, (post)=> post.metaOptions)
    post: Post;

    

    
}
import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tag{
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'varchar',
        length: 90,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false,
        unique: true
    })
    slug: string;


    @Column({
        type: 'varchar',
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    schema?: string;

    @CreateDateColumn({
        type: 'timestamp'
    })
    creationDate: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updateDate: Date;

    @DeleteDateColumn({
        type: 'timestamp'
    })
    deleteDate: Date;

    //Creating a Bi-directional ManyToMany relationship with Post entity
    @ManyToMany(() => Post, (post) => post.tags,{
        onDelete: 'CASCADE',
    })
    posts: Post[];

}
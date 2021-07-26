import { BaseEntity } from './base.entity';
import { Meme } from '../../meme/entity/meme.entity';
import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
    Index,
} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email' })
    @Index({ unique: true })
    email: string;

    @Column({ type: 'text', name: 'password' })
    password: string;

    @OneToMany(() => Meme, meme => meme.user)
    memes: Meme[];
}
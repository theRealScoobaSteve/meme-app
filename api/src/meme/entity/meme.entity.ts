import { BaseEntity } from '../../auth/entity/base.entity';
import { User } from '../../auth/entity/user.entity';
import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    JoinColumn,
    Index,
} from "typeorm";

@Entity('memes')
export class Meme extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    @Index()
    name: string;

    @Column({ name: 'file_name' })
    fileName: string;

    @Column({ name: 'path' })
    path: string;

    @Column({ name: 'mime_type' })
    mimeType: string;

    @ManyToOne(() => User, user => user.memes)
    @JoinColumn({ name: "user_id" })
    user: User
}
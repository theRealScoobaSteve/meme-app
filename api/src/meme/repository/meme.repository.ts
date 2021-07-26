import { EntityRepository, Repository } from 'typeorm';
import { Meme } from '../entity/meme.entity';

@EntityRepository(Meme)
export class MemeRepository extends Repository<Meme> {
    async findMemes(): Promise<Array<Meme>> {
        return this.createQueryBuilder('memes')
            .leftJoinAndSelect('memes.user', 'user')
            .orderBy('memes.createdAt', 'DESC')
            .getMany();
    }
}
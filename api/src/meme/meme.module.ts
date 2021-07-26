import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeController } from './controller/meme.controller';
import { User } from '../auth/entity/user.entity';
import { Meme } from './entity/meme.entity';
import { MemeRepository } from './repository/meme.repository';

@Module({
  controllers: [MemeController],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Meme,
      MemeRepository
    ])
  ]
})
export class MemeModule {}

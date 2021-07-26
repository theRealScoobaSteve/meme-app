import { Test, TestingModule } from '@nestjs/testing';
import { MemeController } from './meme.controller';
import { Repository } from 'typeorm';
import { Meme } from '../entity/meme.entity';

describe('MemeController', () => {
  let controller: MemeController;
  let memeRepository: Repository<Meme>;

  beforeEach(async () => {
    controller = new MemeController(memeRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllMemes', () => {
    it('should return an array of memes', async () => {
      const result = [{
        createdAt: new Date(),
        updatedAt: new Date(),
        fileName: 'test',
        id: 1,
        mimeType: 'image/jpg',
        name: 'this is a test',
        path: '/upload/random',
        user: {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 1,
          email: 'test@test.com',
          password: null
        }
      }];
      jest.spyOn(controller, 'fetchAllMemes').mockImplementation(() => result as any);

      expect(await controller.fetchAllMemes()).toBe(result);
    });
  });
});

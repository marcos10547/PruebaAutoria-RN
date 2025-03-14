import { Test, TestingModule } from '@nestjs/testing';
import { MusicaController } from './musica.controller';

describe('MusicaController', () => {
  let controller: MusicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicaController],
    }).compile();

    controller = module.get<MusicaController>(MusicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

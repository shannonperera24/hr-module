import { Test, TestingModule } from '@nestjs/testing';
import { CommendationController } from './commendation.controller';
import { CommendationService } from './commendation.service';

describe('CommendationController', () => {
  let controller: CommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommendationController],
      providers: [CommendationService],
    }).compile();

    controller = module.get<CommendationController>(CommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

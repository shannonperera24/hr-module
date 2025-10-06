import { Test, TestingModule } from '@nestjs/testing';
import { SecurityClearanceController } from './security_clearance.controller';
import { SecurityClearanceService } from './security_clearance.service';

describe('SecurityClearanceController', () => {
  let controller: SecurityClearanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityClearanceController],
      providers: [SecurityClearanceService],
    }).compile();

    controller = module.get<SecurityClearanceController>(SecurityClearanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

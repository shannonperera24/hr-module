import { Test, TestingModule } from '@nestjs/testing';
import { PersonalLoanController } from './personal_loan.controller';
import { PersonalLoanService } from './personal_loan.service';

describe('PersonalLoanController', () => {
  let controller: PersonalLoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalLoanController],
      providers: [PersonalLoanService],
    }).compile();

    controller = module.get<PersonalLoanController>(PersonalLoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

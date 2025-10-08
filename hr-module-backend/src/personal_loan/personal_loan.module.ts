import { Module } from '@nestjs/common';
import { PersonalLoanService } from './personal_loan.service';
import { PersonalLoanController } from './personal_loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalLoan } from './entities/personal_loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalLoan])],
  controllers: [PersonalLoanController],
  providers: [PersonalLoanService],
})
export class PersonalLoanModule {}

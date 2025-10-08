import { Module } from '@nestjs/common';
import { PayAndBenefitsService } from './pay_and_benefits.service';
import { PayAndBenefitsController } from './pay_and_benefits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayAndBenefit } from './entities/pay_and_benefit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PayAndBenefit])],
  controllers: [PayAndBenefitsController],
  providers: [PayAndBenefitsService],
})
export class PayAndBenefitsModule {}

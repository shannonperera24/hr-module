import { Module } from '@nestjs/common';
import { SpecialDutyService } from './special_duty.service';
import { SpecialDutyController } from './special_duty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialDuty } from './entities/special_duty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialDuty])],
  controllers: [SpecialDutyController],
  providers: [SpecialDutyService],
})
export class SpecialDutyModule {}

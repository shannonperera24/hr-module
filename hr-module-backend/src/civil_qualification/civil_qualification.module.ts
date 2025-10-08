import { Module } from '@nestjs/common';
import { CivilQualificationService } from './civil_qualification.service';
import { CivilQualificationController } from './civil_qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CivilQualification } from './entities/civil_qualification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CivilQualification])],
  controllers: [CivilQualificationController],
  providers: [CivilQualificationService],
})
export class CivilQualificationModule {}

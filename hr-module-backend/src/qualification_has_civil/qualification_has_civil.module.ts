import { Module } from '@nestjs/common';
import { QualificationHasCivilService } from './qualification_has_civil.service';
import { QualificationHasCivilController } from './qualification_has_civil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationHasCivil } from './entities/qualification_has_civil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualificationHasCivil])],
  controllers: [QualificationHasCivilController],
  providers: [QualificationHasCivilService],
})
export class QualificationHasCivilModule {}

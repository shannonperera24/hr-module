import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical_history.service';
import { MedicalHistoryController } from './medical_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory])],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}

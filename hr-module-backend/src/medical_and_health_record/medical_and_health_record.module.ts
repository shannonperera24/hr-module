import { Module } from '@nestjs/common';
import { MedicalAndHealthRecordService } from './medical_and_health_record.service';
import { MedicalAndHealthRecordController } from './medical_and_health_record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalAndHealthRecord } from './entities/medical_and_health_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalAndHealthRecord])],
  controllers: [MedicalAndHealthRecordController],
  providers: [MedicalAndHealthRecordService],
})
export class MedicalAndHealthRecordModule {}

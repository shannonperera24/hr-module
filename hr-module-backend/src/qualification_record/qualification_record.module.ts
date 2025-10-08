import { Module } from '@nestjs/common';
import { QualificationRecordService } from './qualification_record.service';
import { QualificationRecordController } from './qualification_record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationRecord } from './entities/qualification_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualificationRecord])],
  controllers: [QualificationRecordController],
  providers: [QualificationRecordService],
})
export class QualificationRecordModule {}

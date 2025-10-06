import { Module } from '@nestjs/common';
import { CourtMartialRecordService } from './court_martial_record.service';
import { CourtMartialRecordController } from './court_martial_record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtMartialRecord } from './entities/court_martial_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtMartialRecord])],
  controllers: [CourtMartialRecordController],
  providers: [CourtMartialRecordService],
})
export class CourtMartialRecordModule {}

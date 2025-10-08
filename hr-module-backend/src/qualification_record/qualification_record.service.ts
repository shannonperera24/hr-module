import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationRecordDto } from './dto/create-qualification_record.dto';
import { UpdateQualificationRecordDto } from './dto/update-qualification_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualificationRecord } from './entities/qualification_record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationRecordService {
  constructor(
    @InjectRepository(QualificationRecord)
    private qualRecordRepository: Repository<QualificationRecord>
  ) {}

  async create(createQualificationRecordDto: CreateQualificationRecordDto): Promise<QualificationRecord> {
    const qualification_record = this.qualRecordRepository.create(createQualificationRecordDto);
    return this.qualRecordRepository.save(qualification_record);
  }

  findAll(): Promise<QualificationRecord[]> {
    return this.qualRecordRepository.find();
  }

  async findOne(qualification_record_id: number): Promise<QualificationRecord> {
    const qualification_record = await this.qualRecordRepository.findOneBy({ qualification_record_id });
    if (!qualification_record) {
      throw new NotFoundException(`Qualification record with ID ${qualification_record_id} not found`);
    }
    return qualification_record;
  }

  async update(qualification_record_id: number, updateQualificationRecordDto: UpdateQualificationRecordDto): Promise<QualificationRecord> {
    const result = await this.qualRecordRepository.update(qualification_record_id, updateQualificationRecordDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification record with ID ${qualification_record_id} not found`);
    }
    return this.findOne(qualification_record_id);
  }

  async remove(qualification_record_id: number): Promise<void> {
    const result = await this.qualRecordRepository.delete(qualification_record_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification record with ID ${qualification_record_id} not found`);
    }
  }
}
  
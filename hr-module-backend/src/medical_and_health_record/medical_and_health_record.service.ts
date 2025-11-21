import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalAndHealthRecordDto } from './dto/create-medical_and_health_record.dto';
import { UpdateMedicalAndHealthRecordDto } from './dto/update-medical_and_health_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalAndHealthRecord } from './entities/medical_and_health_record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalAndHealthRecordService {
  constructor(
    @InjectRepository(MedicalAndHealthRecord)
    private medAndHealthRecRepository: Repository<MedicalAndHealthRecord>
  ) {}
    
  async create(createMedicalAndHealthRecordDto: CreateMedicalAndHealthRecordDto): Promise<MedicalAndHealthRecord> {
    const medical_and_health_record = this.medAndHealthRecRepository.create(createMedicalAndHealthRecordDto);
    return this.medAndHealthRecRepository.save(medical_and_health_record);
  }

  findAll(): Promise<MedicalAndHealthRecord[]> {
    return this.medAndHealthRecRepository.find();
  }

  async findOne(medical_and_health_record_id: number): Promise<MedicalAndHealthRecord> {
    const medical_and_health_record = await this.medAndHealthRecRepository.findOneBy({ medical_and_health_record_id });
    if (!medical_and_health_record) {
      throw new NotFoundException(`Medical and health record with ID ${medical_and_health_record_id} not found`);
    }
    return medical_and_health_record;
  }

  async update(medical_and_health_record_id: number, updateMedicalAndHealthRecordDto: UpdateMedicalAndHealthRecordDto): Promise<MedicalAndHealthRecord> {
    const result = await this.medAndHealthRecRepository.update(medical_and_health_record_id, updateMedicalAndHealthRecordDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical and health record with ID ${medical_and_health_record_id} not found`);
    }
    return this.findOne(medical_and_health_record_id);
  }

  async remove(medical_and_health_record_id: number): Promise <void> {
    const result = await this.medAndHealthRecRepository.delete(medical_and_health_record_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical and health record with ID ${medical_and_health_record_id} not found`);
    }
  }

  //dashboard
  async getFitnessCategoryStats() {
    const categories = await this.medAndHealthRecRepository
      .createQueryBuilder('record')
      .leftJoin('record.medical_fitness_category', 'cat')
      .select('cat.fitness_category_name', 'fitness_category_name')
      .addSelect('COUNT(*)', 'count')
      .groupBy('cat.fitness_category_name')
      .getRawMany();
    return categories.map(row => ({
      fitness_category_name: row.fitness_category_name,
      count: Number(row.count)
    }));
  }
}
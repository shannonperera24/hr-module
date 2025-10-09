import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical_history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medHistoryRepository: Repository<MedicalHistory>
  ) {}
    
  async create(createMedicalHistoryDto: CreateMedicalHistoryDto): Promise<MedicalHistory> {
    const medical_history = this.medHistoryRepository.create(createMedicalHistoryDto);
    return this.medHistoryRepository.save(medical_history);
  }

  findAll(): Promise<MedicalHistory[]> {
    return this.medHistoryRepository.find();
  }

  async findOne(medical_history_id: number): Promise<MedicalHistory> {
    const medical_history = await this.medHistoryRepository.findOneBy({ medical_history_id });
    if (!medical_history) {
      throw new NotFoundException(`Medical history with ID ${medical_history_id} not found`);
    }
    return medical_history;
  }

  async update(medical_history_id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto): Promise<MedicalHistory> {
    const result = await this.medHistoryRepository.update(medical_history_id, updateMedicalHistoryDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical history with ID ${medical_history_id} not found`);
    }
    return this.findOne(medical_history_id);
  }

  async remove(medical_history_id: number): Promise <void> {
    const result = await this.medHistoryRepository.delete(medical_history_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical history with ID ${medical_history_id} not found`);
    }
  }
}
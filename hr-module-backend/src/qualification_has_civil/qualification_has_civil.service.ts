import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationHasCivilDto } from './dto/create-qualification_has_civil.dto';
import { UpdateQualificationHasCivilDto } from './dto/update-qualification_has_civil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualificationHasCivil } from './entities/qualification_has_civil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationHasCivilService {
  constructor(
    @InjectRepository(QualificationHasCivil)
    private qualHasCivilRepository: Repository<QualificationHasCivil>
  ) {}
    
  async create(createQualificationHasCivilDto: CreateQualificationHasCivilDto): Promise<QualificationHasCivil> {
    const qualification_has_civil = this.qualHasCivilRepository.create(createQualificationHasCivilDto);
    return this.qualHasCivilRepository.save(qualification_has_civil);
  }

  findAll(): Promise<QualificationHasCivil[]> {
    return this.qualHasCivilRepository.find();
  }

  async findOne(qualification_has_civil_id: number): Promise<QualificationHasCivil> {
    const qualification_has_civil = await this.qualHasCivilRepository.findOneBy({ qualification_has_civil_id });
    if (!qualification_has_civil) {
      throw new NotFoundException(`Qualification has civil with ID ${qualification_has_civil_id} not found`);
    }
    return qualification_has_civil;
  }

  async update(qualification_has_civil_id: number, updateQualificationHasCivilDto: UpdateQualificationHasCivilDto): Promise<QualificationHasCivil> {
    const result = await this.qualHasCivilRepository.update(qualification_has_civil_id, updateQualificationHasCivilDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification has civil with ID ${qualification_has_civil_id} not found`);
    }
    return this.findOne(qualification_has_civil_id);
  }

  async remove(qualification_has_civil_id: number): Promise <void> {
    const result = await this.qualHasCivilRepository.delete(qualification_has_civil_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification has civil with ID ${qualification_has_civil_id} not found`);
    }
  }
}
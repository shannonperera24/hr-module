import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCivilQualificationDto } from './dto/create-civil_qualification.dto';
import { UpdateCivilQualificationDto } from './dto/update-civil_qualification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CivilQualification } from './entities/civil_qualification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CivilQualificationService {
  constructor(
    @InjectRepository(CivilQualification)
    private civilQualRepository: Repository<CivilQualification>
  ) {}

  async create(createCivilQualificationDto: CreateCivilQualificationDto): Promise<CivilQualification> {
    const civil_qualification = this.civilQualRepository.create(createCivilQualificationDto);
    return this.civilQualRepository.save(civil_qualification);
  }

  findAll(): Promise<CivilQualification[]> {
    return this.civilQualRepository.find();
  }

  async findOne(civil_qualification_id: number): Promise<CivilQualification> {
    const civil_qualification = await this.civilQualRepository.findOneBy({ civil_qualification_id });
    if (!civil_qualification) {
      throw new NotFoundException(`Civil qualification with ID ${civil_qualification_id} not found`);
    }
    return civil_qualification;
  }

  async update(civil_qualification_id: number, updateCivilQualificationDto: UpdateCivilQualificationDto): Promise<CivilQualification> {
    const result = await this.civilQualRepository.update(civil_qualification_id, updateCivilQualificationDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Civil qualification with ID ${civil_qualification_id} not found`);
    }
    return this.findOne(civil_qualification_id);
  }

  async remove(civil_qualification_id: number): Promise<void> {
    const result = await this.civilQualRepository.delete(civil_qualification_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Civil qualification with ID ${civil_qualification_id} not found`);
    }
  }
}

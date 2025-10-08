import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationLanguageDto } from './dto/create-qualification_language.dto';
import { UpdateQualificationLanguageDto } from './dto/update-qualification_language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualificationLanguage } from './entities/qualification_language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationLanguageService {
  constructor(
    @InjectRepository(QualificationLanguage)
    private qualLanguageRepository: Repository<QualificationLanguage>
  ) {}
    
  async create(createQualificationLanguageDto: CreateQualificationLanguageDto): Promise<QualificationLanguage> {
    const qualification_language = this.qualLanguageRepository.create(createQualificationLanguageDto);
    return this.qualLanguageRepository.save(qualification_language);
  }

  findAll(): Promise<QualificationLanguage[]> {
    return this.qualLanguageRepository.find();
  }

  async findOne(qualification_language_id: number): Promise<QualificationLanguage> {
    const qualification_language = await this.qualLanguageRepository.findOneBy({ qualification_language_id });
    if (!qualification_language) {
      throw new NotFoundException(`Qualification language with ID ${qualification_language_id} not found`);
    }
    return qualification_language;
  }

  async update(qualification_language_id: number, updateQualificationLanguageDto: UpdateQualificationLanguageDto): Promise<QualificationLanguage> {
    const result = await this.qualLanguageRepository.update(qualification_language_id, updateQualificationLanguageDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification language with ID ${qualification_language_id} not found`);
    }
    return this.findOne(qualification_language_id);
  }

  async remove(qualification_language_id: number): Promise <void> {
    const result = await this.qualLanguageRepository.delete(qualification_language_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification language with ID ${qualification_language_id} not found`);
    }
  }
}
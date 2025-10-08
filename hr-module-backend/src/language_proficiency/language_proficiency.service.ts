import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLanguageProficiencyDto } from './dto/create-language_proficiency.dto';
import { UpdateLanguageProficiencyDto } from './dto/update-language_proficiency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageProficiency } from './entities/language_proficiency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageProficiencyService {
  constructor(
    @InjectRepository(LanguageProficiency)
    private languageRepository: Repository<LanguageProficiency>
  ) {}

  async create(createLanguageProficiencyDto: CreateLanguageProficiencyDto): Promise<LanguageProficiency> {
    const language_proficiency = this.languageRepository.create(createLanguageProficiencyDto);
    return this.languageRepository.save(language_proficiency);
  }

  findAll(): Promise<LanguageProficiency[]> {
    return this.languageRepository.find();
  }

  async findOne(language_id: number): Promise<LanguageProficiency> {
    const language_proficiency = await this.languageRepository.findOneBy({ language_id });
    if (!language_proficiency) {
      throw new NotFoundException(`Language proficiency with ID ${language_id} not found`);
    }
    return language_proficiency;
  }

  async update(language_id: number, updateLanguageProficiencyDto: UpdateLanguageProficiencyDto): Promise<LanguageProficiency> {
    const result = await this.languageRepository.update(language_id, updateLanguageProficiencyDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Language proficiency with ID ${language_id} not found`);
    }
    return this.findOne(language_id);
  }

  async remove(language_id: number): Promise<void> {
    const result = await this.languageRepository.delete(language_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Language proficiency with ID ${language_id} not found`);
    }
  }
}

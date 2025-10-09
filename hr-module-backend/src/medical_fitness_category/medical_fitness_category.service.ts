import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalFitnessCategoryDto } from './dto/create-medical_fitness_category.dto';
import { UpdateMedicalFitnessCategoryDto } from './dto/update-medical_fitness_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalFitnessCategory } from './entities/medical_fitness_category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalFitnessCategoryService {
  constructor(
    @InjectRepository(MedicalFitnessCategory)
    private medFitnessCatRepository: Repository<MedicalFitnessCategory>
  ) {}

  async create(createMedicalFitnessCategoryDto: CreateMedicalFitnessCategoryDto): Promise<MedicalFitnessCategory> {
    const medical_fitness_category = this.medFitnessCatRepository.create(createMedicalFitnessCategoryDto);
    return this.medFitnessCatRepository.save(medical_fitness_category);
  }

  findAll(): Promise<MedicalFitnessCategory[]> {
    return this.medFitnessCatRepository.find();
  }

  async findOne(medical_fitness_category_id: number): Promise<MedicalFitnessCategory> {
    const medical_fitness_category = await this.medFitnessCatRepository.findOneBy({ medical_fitness_category_id });
    if (!medical_fitness_category) {
      throw new NotFoundException(`Medical fitness category with ID ${medical_fitness_category_id} not found`);
    }
    return medical_fitness_category;
  }

  async update(medical_fitness_category_id: number, updateMedicalFitnessCategoryDto: UpdateMedicalFitnessCategoryDto): Promise<MedicalFitnessCategory> {
    const result = await this.medFitnessCatRepository.update(medical_fitness_category_id, updateMedicalFitnessCategoryDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical fitness category with ID ${medical_fitness_category_id} not found`);
    }
    return this.findOne(medical_fitness_category_id);
  }

  async remove(medical_fitness_category_id: number): Promise<void> {
    const result = await this.medFitnessCatRepository.delete(medical_fitness_category_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medical fitness category with ID ${medical_fitness_category_id} not found`);
    }
  }
}

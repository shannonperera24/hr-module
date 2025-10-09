import { Module } from '@nestjs/common';
import { MedicalFitnessCategoryService } from './medical_fitness_category.service';
import { MedicalFitnessCategoryController } from './medical_fitness_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalFitnessCategory } from './entities/medical_fitness_category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalFitnessCategory])],
  controllers: [MedicalFitnessCategoryController],
  providers: [MedicalFitnessCategoryService],
})
export class MedicalFitnessCategoryModule {}

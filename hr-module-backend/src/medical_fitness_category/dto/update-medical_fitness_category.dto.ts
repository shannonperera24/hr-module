import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalFitnessCategoryDto } from './create-medical_fitness_category.dto';

export class UpdateMedicalFitnessCategoryDto extends PartialType(CreateMedicalFitnessCategoryDto) {}

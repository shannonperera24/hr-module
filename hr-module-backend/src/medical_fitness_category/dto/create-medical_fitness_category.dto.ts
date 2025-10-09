import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateMedicalFitnessCategoryDto {
    @MaxLength(5)
    @IsString()
    @IsNotEmpty()
    fitness_category_name: string;

    @IsString()
    @IsNotEmpty()
    fitness_category_description: string;
}
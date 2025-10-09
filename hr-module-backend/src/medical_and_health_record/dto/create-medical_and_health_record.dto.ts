import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BloodGroup } from "../entities/medical_and_health_record.entity";

export class CreateMedicalAndHealthRecordDto {
    @IsEnum(BloodGroup, {
        message: 'Blood group required'
    })
    blood_group: BloodGroup;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    height_cm: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    weight_kg: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    bmi: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Medical check date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    medical_check_date: Date;

    @IsString()
    @IsOptional()
    disability?: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    medical_fitness_category_id: number;
}
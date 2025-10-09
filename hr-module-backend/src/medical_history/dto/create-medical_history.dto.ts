import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalHistoryDto {
    @IsNotEmpty()
    @IsDate({
        message: 'Medical history date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    medical_history_date: Date;

    @IsString()
    @IsNotEmpty()
    medical_history_description: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    medical_and_health_record_id: number;
}
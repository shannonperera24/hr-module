import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQualificationHasCivilDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    qualification_record_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    civil_qualification_id: number;

    @MaxLength(150)
    @IsString()
    @IsNotEmpty()
    civil_qualification_institution: string;

    @IsNotEmpty()
    @IsDate({
        message: 'Civil qualification date completed must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    civil_qualification_date_completed: Date;
}
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQualificationLanguageDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    qualification_record_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    language_id: number;

    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    language_proficiency_level: string;
}

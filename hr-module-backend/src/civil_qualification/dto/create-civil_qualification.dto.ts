import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCivilQualificationDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    civil_qualification_name: string;
}
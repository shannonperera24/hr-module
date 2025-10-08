import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateLanguageProficiencyDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    language_name: string;
}

import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommendationDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    commendation_name: string;
}

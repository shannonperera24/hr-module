import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAwardDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    award_name: string;
}
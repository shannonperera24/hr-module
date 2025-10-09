import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSportingAchievementDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    sport: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    achievement: string;
}
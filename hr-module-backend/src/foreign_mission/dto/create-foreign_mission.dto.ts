import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateForeignMissionDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    foreign_mission_country: string;

    @IsString()
    @IsNotEmpty()
    foreign_mission_description: string;
}
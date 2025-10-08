import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateComputerSkillDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    computer_skill_name: string;
}

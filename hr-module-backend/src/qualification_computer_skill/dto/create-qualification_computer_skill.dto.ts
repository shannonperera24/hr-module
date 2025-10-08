import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateQualificationComputerSkillDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    qualification_record_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    computer_skill_id: number;
}
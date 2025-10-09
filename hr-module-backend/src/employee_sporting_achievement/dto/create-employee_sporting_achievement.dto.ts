import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateEmployeeSportingAchievementDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    sporting_achievement_id: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Sporting achievement date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    achievement_date: Date;
}
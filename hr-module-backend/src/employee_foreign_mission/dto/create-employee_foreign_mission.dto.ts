import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateEmployeeForeignMissionDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    foreign_mission_id: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Foreign mission date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    foreign_mission_date: Date;
}
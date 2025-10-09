import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateEmployeeCommendationDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    commendation_id: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Commendation date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    commendation_date: Date;
}
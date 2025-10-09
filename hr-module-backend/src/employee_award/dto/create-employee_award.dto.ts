import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateEmployeeAwardDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    award_id: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Award date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    award_date: Date;
}
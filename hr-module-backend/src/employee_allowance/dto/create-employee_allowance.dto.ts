import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { AllowanceStatus } from "../entities/employee_allowance.entity";

export class CreateEmployeeAllowanceDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    pay_and_benefits_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    allowance_id: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    allowance_amount: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Allowance start date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    allowance_start_date: Date;

    @IsEnum(AllowanceStatus, {
        message: 'Allowance status required'
    })
    allowance_status: AllowanceStatus;
}
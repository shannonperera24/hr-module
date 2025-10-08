import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePersonalLoanDto {
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    loan_amount: number;
    
    @IsNotEmpty()
    @IsDate({
        message: 'Loan date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    loan_date: Date;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    interest_rate: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Repayment start date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    repayment_start_date: Date;

    @IsOptional()
    @IsDate({
        message: 'Repayment end date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    repayment_end_date?: Date;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    pay_and_benefits_id: number;
}

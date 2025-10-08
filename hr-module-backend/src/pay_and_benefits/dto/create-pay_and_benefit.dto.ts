import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePayAndBenefitDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    pay_code: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Type(() => Number)
    basic_pay: number;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    bank_account_no: string;

    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    bank_name: string;

    @MaxLength(30)
    @IsString()
    @IsOptional()
    epf_no?: string;

    @MaxLength(30)
    @IsString()
    @IsOptional()
    insurance_no?: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;
}

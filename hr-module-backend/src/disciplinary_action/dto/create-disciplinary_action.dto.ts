import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateDisciplinaryActionDto {
    @IsNotEmpty()
    @IsDate({
        message: 'Date of action must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    date_of_action: Date;

    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    action_type: string;

    @IsString()
    @IsNotEmpty()
    outcome: string;

    @IsString()
    @IsNotEmpty()
    reason_for_action: string;

    @IsString()
    @IsOptional()
    confidential_remarks?: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;
}

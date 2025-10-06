import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCourtMartialRecordDto {
    @IsNotEmpty()
    @IsDate({
        message: 'Date of trial must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    date_of_trial: Date;

    @IsNotEmpty()
    @IsString()
    charges: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    verdict: string;

    @IsNotEmpty()
    @IsString()
    sentence: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;
}

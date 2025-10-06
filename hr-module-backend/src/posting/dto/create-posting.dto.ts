import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePostingDto {
    @IsNotEmpty()
    @IsDate({
        message: 'From date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    from_date: Date;

    @IsNotEmpty()
    @IsDate({
        message: 'To date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    to_date: Date;

    @IsInt()
    @IsNotEmpty()
    rank_id: number;

    @IsInt()
    @IsNotEmpty()
    corp_and_regiment_id: number;

    @IsInt()
    @IsNotEmpty()
    unit_id: number;

    @IsInt()
    @IsNotEmpty()
    appointment_id: number;

    @IsInt()
    @IsOptional()
    special_duty_id: number;

    @IsInt()
    @IsOptional()
    overseas_posting_id: number;

    @IsInt()
    @IsNotEmpty()
    emp_no: number;
}

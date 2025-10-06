import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ServiceNumberStamp } from "../entities/service_history.entity";

export class CreateServiceHistoryDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    category: string;

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    type_of_service: string;

    @IsNotEmpty()
    @IsDate({
        message: 'Enlistment date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    enlistment_date: Date;

    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    current_status: string;

    @IsOptional()
    @IsDate({
        message: 'Retirement date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    retirement_date?: Date;

    @IsEnum(ServiceNumberStamp, {
        message: 'Service number stamp required'
    })
    service_number_stamp: ServiceNumberStamp;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;
}

import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Gender, MaritalStatus } from "../entities/employee.entity";
import { Type } from "class-transformer";


export class CreateEmployeeDto {
    @MaxLength(12)
    @IsString()
    @IsNotEmpty()
    nic_no: string;

    @MaxLength(20)
    @IsString()
    @IsOptional()
    passport_no?: string;

    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    name_in_sinhala?: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    name_in_tamil?: string;

    @IsNotEmpty()
    @IsDate({
        message: 'Date of birth must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    date_of_birth: Date;

    @IsEnum(Gender, {
        message: 'Gender required'
    })
    gender: Gender;

    @IsEnum(MaritalStatus, {
        message: 'Marital status required'
    })
    marital_status: MaritalStatus;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    spouse_name?: string;

    @Min(0)
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    number_of_children: number = 0;

    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    religion: string;

    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    nationality: string = 'Sri Lankan';

    @MaxLength(255)
    @IsString()
    @IsOptional()
    photo_id?: string;
}

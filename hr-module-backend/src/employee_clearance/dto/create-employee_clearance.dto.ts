import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ClearanceStatus } from "../entities/employee_clearance.entity";

export class CreateEmployeeClearanceDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    security_clearance_id: number;

    @IsNotEmpty()
    @IsDate({
        message: 'Clearance expiry must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    clearance_expiry: Date;

    @IsEnum(ClearanceStatus, {
        message: 'Clearance status required'
    })
    clearance_status: ClearanceStatus;
}

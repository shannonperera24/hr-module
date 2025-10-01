import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsInt, IsBoolean, IsOptional, MaxLength } from "class-validator";
import { UserRole } from "../entities/user.entity";
import { Type } from "class-transformer";

export class CreateUserDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    username: string;

    @MaxLength(255)
    @IsString()
    @MinLength(8, {
        message: 'Password must be at least 8 characters long'
    })
    @IsNotEmpty()
    password_hash: string;

    @MaxLength(100)
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsEnum(UserRole, {
        message: 'Valid role required'
    })
    user_role: UserRole;
    
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    is_active?: boolean = true;
    
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    emp_no: number;
}

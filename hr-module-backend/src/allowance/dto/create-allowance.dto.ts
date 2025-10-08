import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAllowanceDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    allowance_type: string;
}

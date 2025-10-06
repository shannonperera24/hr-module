import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSpecialDutyDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    special_duty_type: string;

    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    special_duty_description: string;
}

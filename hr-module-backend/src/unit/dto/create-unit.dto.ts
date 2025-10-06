import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUnitDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    unit_name: string;
}

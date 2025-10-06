import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateOverseasPostingDto {
    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    overseas_posting_type: string;

    @MaxLength(50)
    @IsString()
    @IsNotEmpty()
    overseas_posting_country: string;

    @MaxLength(200)
    @IsString()
    @IsNotEmpty()
    overseas_posting_description: string;
}

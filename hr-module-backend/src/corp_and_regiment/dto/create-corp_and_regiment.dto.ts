import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCorpAndRegimentDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    corp_and_regiment_name: string;
}
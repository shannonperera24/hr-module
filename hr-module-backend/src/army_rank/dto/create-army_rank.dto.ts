import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateArmyRankDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    rank_name: string;
}

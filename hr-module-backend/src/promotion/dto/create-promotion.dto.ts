import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreatePromotionDto {
    @IsNotEmpty()
    @IsDate({
        message: 'Promotion date must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    promotion_date: Date;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    old_rank_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    new_rank_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    service_history_id: number;
}
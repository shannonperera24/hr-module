import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { WeaponHandlingClearance } from "../entities/security_clearance.entity";

export class CreateSecurityClearanceDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    security_clearance_level: string;

    @IsEnum(WeaponHandlingClearance, {
        message: 'Weapon handling clearance required'
    })
    weapon_handling_clearance: WeaponHandlingClearance;
}

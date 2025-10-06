import { EmployeeClearance } from "src/employee_clearance/entities/employee_clearance.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum WeaponHandlingClearance {
    Yes = 'Yes',
    No = 'No'
}

@Entity('security_clearance')
export class SecurityClearance {
    @PrimaryGeneratedColumn()
    security_clearance_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    security_clearance_level: string;

    @Column({ type: 'enum', enum: WeaponHandlingClearance, enumName: 'weapon_handling_clearance_enum' })
    weapon_handling_clearance: WeaponHandlingClearance;

    @OneToMany(() => EmployeeClearance, employee_clearance => employee_clearance.security_clearance)
    employee_clearances: EmployeeClearance[];
}

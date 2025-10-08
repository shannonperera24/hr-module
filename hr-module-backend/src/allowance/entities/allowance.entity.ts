import { EmployeeAllowance } from "src/employee_allowance/entities/employee_allowance.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('allowance')
export class Allowance {
    @PrimaryGeneratedColumn()
    allowance_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    allowance_type: string;

    @OneToMany(() => EmployeeAllowance, employee_allowance => employee_allowance.allowance)
    employee_allowances: EmployeeAllowance[];
}

import { EmployeeCommendation } from "src/employee_commendation/entities/employee_commendation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('commendation')
export class Commendation {
    @PrimaryGeneratedColumn()
    commendation_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    commendation_name: string;

    @OneToMany(() => EmployeeCommendation, employee_commendation => employee_commendation.commendation)
    employee_commendations: EmployeeCommendation[];
}

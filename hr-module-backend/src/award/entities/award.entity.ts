import { EmployeeAward } from "src/employee_award/entities/employee_award.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('award')
export class Award {
    @PrimaryGeneratedColumn()
    award_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    award_name: string;

    @OneToMany(() => EmployeeAward, employee_award => employee_award.award)
    employee_awards: EmployeeAward[];
}

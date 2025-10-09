import { Award } from "src/award/entities/award.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee_award')
export class EmployeeAward {
    @PrimaryGeneratedColumn()
    employee_award_id: number;

    @Column({ type: 'date' })
    award_date: Date;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    award_id: number;

    @ManyToOne(() => Award)
    @JoinColumn({ name: 'award_id' })
    award: Award;
}
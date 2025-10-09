import { Commendation } from "src/commendation/entities/commendation.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee_commendation')
export class EmployeeCommendation {
    @PrimaryGeneratedColumn()
    employee_commendation_id: number;

    @Column({ type: 'date' })
    commendation_date: Date;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    commendation_id: number;

    @ManyToOne(() => Commendation)
    @JoinColumn({ name: 'commendation_id' })
    commendation: Commendation;
}
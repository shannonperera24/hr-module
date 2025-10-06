import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('disciplinary_action')
export class DisciplinaryAction {
    @PrimaryGeneratedColumn()
    action_id: number;

    @Column({ type: 'date'})
    date_of_action: Date;

    @Column({ type: 'varchar', length: 50 })
    action_type: string;

    @Column({ type: 'text' })
    outcome: string;

    @Column({ type: 'text' })
    reason_for_action: string;

    @Column({ type: 'text', nullable: true })
    confidential_remarks?: string;

    @Column()
    emp_no: number;    

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;
}

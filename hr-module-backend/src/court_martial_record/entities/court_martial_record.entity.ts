import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('court_martial_record')
export class CourtMartialRecord {
    @PrimaryGeneratedColumn()
    court_martial_record_id: number;

    @Column({ type: 'date' })
    date_of_trial: Date;

    @Column({ type: 'text' })
    charges: string;

    @Column({ type: 'varchar', length: 50 })
    verdict: string;

    @Column({ type: 'text' })
    sentence: string;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;
}

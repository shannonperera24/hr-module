import { Employee } from "src/employees/entities/employee.entity";
import { ForeignMission } from "src/foreign_mission/entities/foreign_mission.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('employee_foreign_mission')
@Unique(['emp_no', 'foreign_mission_id', 'foreign_mission_date'])
export class EmployeeForeignMission {
    @PrimaryGeneratedColumn()
    employee_foreign_mission_id: number;

    @Column({ type: 'date' })
    foreign_mission_date: Date;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    foreign_mission_id: number;

    @ManyToOne(() => ForeignMission)
    @JoinColumn({ name: 'foreign_mission_id' })
    foreign_mission: ForeignMission;
}
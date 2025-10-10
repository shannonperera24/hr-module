import { Employee } from "src/employees/entities/employee.entity";
import { SportingAchievement } from "src/sporting_achievement/entities/sporting_achievement.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('employee_sporting_achievement')
@Unique(['emp_no', 'sporting_achievement_id', 'achievement_date'])
export class EmployeeSportingAchievement {
    @PrimaryGeneratedColumn()
    employee_sporting_achievement_id: number;

    @Column({ type: 'date' })
    achievement_date: Date;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    sporting_achievement_id: number;

    @ManyToOne(() => SportingAchievement)
    @JoinColumn({ name: 'sporting_achievement_id' })
    sporting_achievement: SportingAchievement;
}

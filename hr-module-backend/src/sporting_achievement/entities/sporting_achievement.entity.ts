import { EmployeeSportingAchievement } from "src/employee_sporting_achievement/entities/employee_sporting_achievement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('sporting_achievement')
export class SportingAchievement {
    @PrimaryGeneratedColumn()
    sporting_achievement_id: number;

    @Column({ type: 'varchar', length: 50 })
    sport: string;

    @Column({ type: 'varchar', length: 255 })
    achievement: string;

    @OneToMany(() => EmployeeSportingAchievement, employee_sporting_achievement => employee_sporting_achievement.sporting_achievement)
    employee_sporting_achievements: EmployeeSportingAchievement[];
}
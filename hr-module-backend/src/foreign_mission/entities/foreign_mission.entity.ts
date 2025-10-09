import { EmployeeForeignMission } from "src/employee_foreign_mission/entities/employee_foreign_mission.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('foreign_mission')
export class ForeignMission {
    @PrimaryGeneratedColumn()
    foreign_mission_id: number;

    @Column({ type: 'varchar', length: 50 })
    foreign_mission_country: string;

    @Column({ type: 'text' })
    foreign_mission_description: string;

    @OneToMany(() => EmployeeForeignMission, employee_foreign_mission => employee_foreign_mission.foreign_mission)
    employee_foreign_missions: EmployeeForeignMission[];
}
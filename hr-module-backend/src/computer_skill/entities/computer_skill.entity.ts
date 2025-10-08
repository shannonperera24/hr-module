import { QualificationComputerSkill } from "src/qualification_computer_skill/entities/qualification_computer_skill.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('computer_skill')
export class ComputerSkill {
    @PrimaryGeneratedColumn()
    computer_skill_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    computer_skill_name: string;

    @OneToMany(() => QualificationComputerSkill, qualification_computer_skill => qualification_computer_skill.computer_skill)
    qualification_computer_skills: QualificationComputerSkill[];
}

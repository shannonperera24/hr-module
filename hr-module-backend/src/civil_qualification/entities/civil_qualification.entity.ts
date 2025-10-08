import { QualificationHasCivil } from "src/qualification_has_civil/entities/qualification_has_civil.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('civil_qualification')
export class CivilQualification {
    @PrimaryGeneratedColumn()
    civil_qualification_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    civil_qualification_name: string;

    @OneToMany(() => QualificationHasCivil, qualification_has_civil => qualification_has_civil.civil_qualification)
    qualification_has_civils: QualificationHasCivil[];
}

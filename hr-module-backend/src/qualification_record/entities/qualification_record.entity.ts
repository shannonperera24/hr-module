import { Employee } from "src/employees/entities/employee.entity";
import { QualificationArmyTrainingCourse } from "src/qualification_army_training_course/entities/qualification_army_training_course.entity";
import { QualificationComputerSkill } from "src/qualification_computer_skill/entities/qualification_computer_skill.entity";
import { QualificationHasCivil } from "src/qualification_has_civil/entities/qualification_has_civil.entity";
import { QualificationLanguage } from "src/qualification_language/entities/qualification_language.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum HasInstructorExperience {
    Yes = 'Yes',
    No = 'No'
}

@Entity('qualification_record')
export class QualificationRecord {
    @PrimaryGeneratedColumn()
    qualification_record_id: number;

    @Column({ type: 'enum', enum: HasInstructorExperience, enumName: 'has_instructor_experience_enum' })
    has_instructor_experience: HasInstructorExperience;

    @Column()
    emp_no: number;    

    @OneToOne(() => Employee, (employee) => employee.qualification_record )
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @OneToMany(() => QualificationHasCivil, qualification_has_civil => qualification_has_civil.qualification_record)
    qualification_has_civils: QualificationHasCivil[];

    @OneToMany(() => QualificationArmyTrainingCourse, qualification_army_training_course => qualification_army_training_course.qualification_record)
    qualification_army_training_courses: QualificationArmyTrainingCourse[];

    @OneToMany(() => QualificationLanguage, qualification_language => qualification_language.qualification_record)
    qualification_languages: QualificationLanguage[];

    @OneToMany(() => QualificationComputerSkill, qualification_computer_skill => qualification_computer_skill.qualification_record)
    qualification_computer_skills: QualificationComputerSkill[];
}
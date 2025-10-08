import { QualificationLanguage } from "src/qualification_language/entities/qualification_language.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('language_proficiency')
export class LanguageProficiency {
    @PrimaryGeneratedColumn()
    language_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    language_name: string;

    @OneToMany(() => QualificationLanguage, qualification_language => qualification_language.language_proficiency)
    qualification_languages: QualificationLanguage[];
}

import { Posting } from "src/posting/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('unit')
export class Unit {
    @PrimaryGeneratedColumn()
    unit_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    unit_name: string;

    @OneToMany(() => Posting, posting => posting.unit)
    postings: Posting[];
}

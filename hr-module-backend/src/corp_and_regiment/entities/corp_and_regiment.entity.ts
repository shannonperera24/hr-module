import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('corp_and_regiment')
export class CorpAndRegiment {
    @PrimaryGeneratedColumn()
    corp_and_regiment_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    corp_and_regiment_name: string;
}

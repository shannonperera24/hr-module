import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('army_rank')
export class ArmyRank {
    @PrimaryGeneratedColumn()
    rank_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    rank_name: string;
}

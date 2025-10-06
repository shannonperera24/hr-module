import { ArmyRank } from "src/army_rank/entities/army_rank.entity";
import { ServiceHistory } from "src/service_history/entities/service_history.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('promotion')
export class Promotion {
    @PrimaryGeneratedColumn()
    promotion_id: number;

    @Column({ type: 'date'})
    promotion_date: Date;

    @Column()
    old_rank_id: number; 

    @ManyToOne(() => ArmyRank )
    @JoinColumn({ name: 'old_rank_id' })
    old_rank: ArmyRank;

    @Column()
    new_rank_id: number; 

    @ManyToOne(() => ArmyRank )
    @JoinColumn({ name: 'new_rank_id' })
    new_rank: ArmyRank;

    @Column()
    service_history_id: number; 

    @ManyToOne(() => ServiceHistory )
    @JoinColumn({ name: 'service_history_id' })
    service_history: ServiceHistory;
}

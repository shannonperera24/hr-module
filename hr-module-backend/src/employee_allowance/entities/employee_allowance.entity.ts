import { Allowance } from "src/allowance/entities/allowance.entity";
import { PayAndBenefit } from "src/pay_and_benefits/entities/pay_and_benefit.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum AllowanceStatus {
    Active = 'Active',
    Suspended = 'Suspended',
    Ended = 'Ended'
}

@Entity('employee_allowance')
@Unique(['pay_and_benefits_id', 'allowance_id'])
@Check(`"allowance_amount" >= 0`)
export class EmployeeAllowance {
    @PrimaryGeneratedColumn()
    employee_allowance_id: number;

    @Column()
    pay_and_benefits_id: number;
    
    @ManyToOne(() => PayAndBenefit)
    @JoinColumn({ name: 'pay_and_benefits_id' })
    pay_and_benefits: PayAndBenefit;

    @Column()
    allowance_id: number;
    
    @ManyToOne(() => Allowance)
    @JoinColumn({ name: 'allowance_id' })
    allowance: Allowance;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    allowance_amount: number;

    @Column({ type: 'date' })
    allowance_start_date: Date;

    @Column({ type: 'enum', enum: AllowanceStatus, enumName: 'allowance_status_enum' })
    allowance_status: AllowanceStatus;
}

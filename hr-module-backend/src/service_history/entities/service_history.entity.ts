import { Employee } from "src/employees/entities/employee.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Check, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ServiceNumberStamp {
    Yes = 'Yes',
    No = 'No'
}

@Entity('service_history')
@Check(`"retirement_date" IS NULL OR "retirement_date" >= "enlistment_date"`)
export class ServiceHistory {
    @PrimaryGeneratedColumn()
    service_history_id: number;

    @Column({ type: 'varchar', length: 20 })
    category: string;

    @Column({ type: 'varchar', length: 30 })
    type_of_service: string;

    @Column({ type: 'date'})
    enlistment_date: Date;

    @Column({ type: 'varchar', length: 20 })
    current_status: string;
    
    @Column({ type: 'date', nullable: true })
    retirement_date?: Date;

    @Column({ type: 'enum', enum: ServiceNumberStamp, enumName: 'service_number_stamp_enum' })
    service_number_stamp: ServiceNumberStamp;

    @Column()
    emp_no: number;    
    
    @OneToOne(() => Employee, (employee) => employee.service_history )
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @OneToMany(() => Promotion, promotion => promotion.service_history)
    promotions: Promotion[];
}

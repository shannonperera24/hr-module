import { Employee } from "src/employees/entities/employee.entity";
import { SecurityClearance } from "src/security_clearance/entities/security_clearance.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ClearanceStatus {
    Active = 'Active',
    Expired = 'Expired',
    Revoked = 'Revoked',
    Suspended = 'Suspended'
}

@Entity('employee_clearance')
export class EmployeeClearance {
    @PrimaryGeneratedColumn()
    employee_clearance_id: number;

    @Column({ type: 'date' })
    clearance_expiry: Date;

    @Column({ type: 'enum', enum: ClearanceStatus, enumName: 'clearance_status_enum' })
    clearance_status: ClearanceStatus;

    @Column()
    emp_no: number;
    
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    security_clearance_id: number;

    @ManyToOne(() => SecurityClearance)
    @JoinColumn({ name: 'security_clearance_id' })
    security_clearance: SecurityClearance;
}

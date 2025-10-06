import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }
  
  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(appointment_id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ appointment_id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
    return appointment;
  }

  async update(appointment_id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const result = await this.appointmentRepository.update(appointment_id, updateAppointmentDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
    return this.findOne(appointment_id);
  }

  async remove(appointment_id: number): Promise <void> {
    const result = await this.appointmentRepository.delete(appointment_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
  }
}

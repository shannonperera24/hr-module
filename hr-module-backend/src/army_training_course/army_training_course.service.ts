import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArmyTrainingCourseDto } from './dto/create-army_training_course.dto';
import { UpdateArmyTrainingCourseDto } from './dto/update-army_training_course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArmyTrainingCourse } from './entities/army_training_course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArmyTrainingCourseService {
  constructor(
    @InjectRepository(ArmyTrainingCourse)
    private courseRepository: Repository<ArmyTrainingCourse>
  ) {}

  async create(createArmyTrainingCourseDto: CreateArmyTrainingCourseDto): Promise<ArmyTrainingCourse> {
    const army_training_course = this.courseRepository.create(createArmyTrainingCourseDto);
    return this.courseRepository.save(army_training_course);
  }

  findAll(): Promise<ArmyTrainingCourse[]> {
    return this.courseRepository.find();
  }

  async findOne(course_id: number): Promise<ArmyTrainingCourse> {
    const army_training_course = await this.courseRepository.findOneBy({ course_id });
    if (!army_training_course) {
      throw new NotFoundException(`Army training course with ID ${course_id} not found`);
    }
    return army_training_course;
  }

  async update(course_id: number, updateArmyTrainingCourseDto: UpdateArmyTrainingCourseDto): Promise<ArmyTrainingCourse> {
    const result = await this.courseRepository.update(course_id, updateArmyTrainingCourseDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Army training course with ID ${course_id} not found`);
    }
    return this.findOne(course_id);
  }

  async remove(course_id: number): Promise<void> {
    const result = await this.courseRepository.delete(course_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Army training course with ID ${course_id} not found`);
    }
  }
}
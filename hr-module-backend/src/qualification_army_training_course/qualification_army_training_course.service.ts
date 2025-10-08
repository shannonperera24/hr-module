import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationArmyTrainingCourseDto } from './dto/create-qualification_army_training_course.dto';
import { UpdateQualificationArmyTrainingCourseDto } from './dto/update-qualification_army_training_course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualificationArmyTrainingCourse } from './entities/qualification_army_training_course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationArmyTrainingCourseService {
  constructor(
    @InjectRepository(QualificationArmyTrainingCourse)
    private qualCourseRepository: Repository<QualificationArmyTrainingCourse>
  ) {}

  async create(createQualificationArmyTrainingCourseDto: CreateQualificationArmyTrainingCourseDto): Promise<QualificationArmyTrainingCourse> {
    const qualification_army_training_course = this.qualCourseRepository.create(createQualificationArmyTrainingCourseDto);
    return this.qualCourseRepository.save(qualification_army_training_course);
  }

  findAll(): Promise<QualificationArmyTrainingCourse[]> {
    return this.qualCourseRepository.find();
  }

  async findOne(qualification_course_id: number): Promise<QualificationArmyTrainingCourse> {
    const qualification_army_training_course = await this.qualCourseRepository.findOneBy({ qualification_course_id });
    if (!qualification_army_training_course) {
      throw new NotFoundException(`Qualification army training course with ID ${qualification_course_id} not found`);
    }
    return qualification_army_training_course;
  }

  async update(qualification_course_id: number, updateQualificationArmyTrainingCourseDto: UpdateQualificationArmyTrainingCourseDto): Promise<QualificationArmyTrainingCourse> {
    const result = await this.qualCourseRepository.update(qualification_course_id, updateQualificationArmyTrainingCourseDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification army training course with ID ${qualification_course_id} not found`);
    }
    return this.findOne(qualification_course_id);
  }

  async remove(qualification_course_id: number): Promise<void> {
    const result = await this.qualCourseRepository.delete(qualification_course_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification army training course with ID ${qualification_course_id} not found`);
    }
  }
}
  
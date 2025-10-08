import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { HasInstructorExperience } from "../entities/qualification_record.entity";

export class CreateQualificationRecordDto {
    @IsEnum(HasInstructorExperience, {
        message: 'Has instructor experience required'
    })
    has_instructor_experience: HasInstructorExperience;

    @IsInt()
    @IsNotEmpty()
    emp_no: number;
}
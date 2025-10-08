import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQualificationArmyTrainingCourseDto {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    qualification_record_id: number;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    course_id: number;

    @MaxLength(150)
    @IsString()
    @IsNotEmpty()
    course_institution: string;

    @IsNotEmpty()
    @IsDate({
        message: 'Course date completed must be a valid date in YYYY-MM-DD format'
    })
    @Type(() => Date)
    course_date_completed: Date;
}
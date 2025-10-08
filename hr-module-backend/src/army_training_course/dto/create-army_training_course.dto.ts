import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateArmyTrainingCourseDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    course_name: string;
}

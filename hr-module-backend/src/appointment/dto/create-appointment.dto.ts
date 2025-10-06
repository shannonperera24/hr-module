import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAppointmentDto {
    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    appointment_name: string;
}

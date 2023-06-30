import { EmailSingle } from "src/validation/emailSingle.validator";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class PathUserDTO {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'The name must be a string' })
    @IsOptional()
    name: string;
  
    @IsEmail({}, { message: 'Email must be valid' })
    @EmailSingle({ message: 'there is a user with that email'})
    @IsOptional()
    email: string;
  
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @IsOptional()
    password: string;
}
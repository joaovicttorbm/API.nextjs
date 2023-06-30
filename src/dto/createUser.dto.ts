import { EmailSingle } from "src/validation/emailSingle.validator";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'The name must be a string' })
    name: string;
  
    @IsEmail({}, { message: 'Email must be valid' })
    @EmailSingle({ message: 'There is a user with that email'})
    email: string;
  
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
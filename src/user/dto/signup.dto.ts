import { PartialType } from '@nestjs/mapped-types';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsString,  MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Name is missing'})
  @IsString()
  name: string;

  @Trim()
  @IsNotEmpty({ message: 'Email is missing'})
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty({ message: 'Password is missing'})
  @IsString()
  @MinLength(8)
  password: string;

  
  confirmPassword: string;
}

export class UpdateUserDto extends PartialType(SignupDto) {}
import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, } from 'class-validator';

export class SigninDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  username: any;
}



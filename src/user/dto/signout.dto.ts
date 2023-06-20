import { IsNotEmpty, IsString } from 'class-validator';

export class SignoutDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  refreshToken: string;
}


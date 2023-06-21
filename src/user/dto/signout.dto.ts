import { IsNotEmpty, IsString } from 'class-validator';

export class SignoutDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  refreshToken: string;
}

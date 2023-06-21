import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignoutDto } from 'src/user/dto/signout.dto';
import { AuthGuard, Public } from './auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // This endpoint is public and accessible to all
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signupData: SignupDto): Promise<{ message: string; result: Partial<UserEntity>; }> {
    const result = await this.authService.signup(signupData);
    return result;
  }

  @Public() // This endpoint is public and accessible to all
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinData: SigninDto): Promise<{ message: string; token: { accessToken: string; refreshToken: string } }> {
    const result = await this.authService.signin(signinData);
    return result;
  }

  @Public()
  @UseGuards(AuthGuard) // Apply the AuthGuard to protect this endpoint
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(@Body() signoutData: SignoutDto): Promise<{ message: string}> {
    const result = await this.authService.signout(signoutData);
    return result;
  }
}

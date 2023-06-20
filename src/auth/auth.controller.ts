import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignoutDto } from 'src/user/dto/signout.dto';
import { AuthGuard, Public} from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // This endpoint is public and accessible to all
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signupData: SignupDto): Promise<void> {
    await this.authService.signup(signupData);
  }

 
  @Public() // This endpoint is public and accessible to all
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() signinData: SigninDto): Promise<{ token: string }> {
    const token = await this.authService.signin(signinData);
    return { token };
  }

  @UseGuards(AuthGuard) // Apply the AuthGuard to protect this endpoint
  @Get('protected-resource')
  async protectedResource(): Promise<string> {
    // Only authenticated users can access this resource
    return 'This is a protected resource!';
  }

  @UseGuards(AuthGuard) // Apply the AuthGuard to protect this endpoint
  @Post('signout')
  async signout(@Body() signoutData: SignoutDto): Promise<void> {
    await this.authService.signout(signoutData);
  }
}

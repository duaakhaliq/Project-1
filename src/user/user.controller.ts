import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { SignoutDto } from './dto/signout.dto';
import { AuthGuard} from 'src/auth/auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.userService.signup(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UseGuards(AuthGuard)
  async signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  async signout(@Body() signoutDto: SignoutDto) {
    await this.userService.signout(signoutDto);
  }


}
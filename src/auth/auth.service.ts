import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignoutDto } from 'src/user/dto/signout.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  public async signup(signupData: SignupDto): Promise<void> {
    // Call the UserService to handle the signup logic
    await this.userService.signup(signupData);
  }

  public async signin(signinData: SigninDto): Promise<string> {
    // Call the UserService to handle the signin logic
    const token = await this.userService.signin(signinData);

    // Return the generated token
    return token;
  }

  public async signout(signoutData: SignoutDto): Promise<void> {
    // Call the UserService to handle the signout logic
    await this.userService.signout(signoutData);
  }
}

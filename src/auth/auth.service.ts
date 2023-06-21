import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from 'src/user/dto/signup.dto';
import { SigninDto } from 'src/user/dto/signin.dto';
import { SignoutDto } from 'src/user/dto/signout.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/user/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  public async signup(signupData: SignupDto): Promise<{ message: string; result: Partial<UserEntity> }> {
    const user = await this.userService.signup(signupData);
    const { password, ...result } = user;
    return { message: 'User successfully created', result };
  }

  public async signin(signinData: SigninDto): Promise<{ message: string; token: { accessToken: string; refreshToken: string } }> {
    const { email, password } = signinData;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   throw new UnauthorizedException('Invalid email or password');
    // }
    const payload = { id: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync( payload, { secret: 'hello', expiresIn: '5m', });
    const refreshToken = await this.jwtService.signAsync(payload, { secret: 'hello-world', expiresIn: '7d', });
    
    await this.sessionService.createSession(user, refreshToken);

    return { message: ` ${user.name} with userId=${user.id} successfully signed in`, token: { accessToken, refreshToken } };
  }

  public async signout(signoutData: SignoutDto): Promise<{ message: string; }>{
    const {id, refreshToken } = signoutData;
    
    await this.sessionService.deleteSessionByUserIdAndRefreshToken(id , refreshToken);
    return { message: 'User successfully signed out' };
  }
}



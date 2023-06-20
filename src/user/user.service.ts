import { Repository, } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { SignoutDto } from './dto/signout.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SessionService } from 'src/user/session/session.service';

const saltRounds = 10;
const jwtSecret = 'your-secret-key';

export class UserService
{
  private loggedUsers: Set<string>; // Set to store logged-in user tokens
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>, // Inject the UserEntity repository
    private jwtService: JwtService, // JWT service for token generation
    private readonly sessionService: SessionService,
  )
  {
    this.loggedUsers = new Set();
  }
  
    public async signup(signupData: SignupDto): Promise<UserEntity> {
      // Destructure properties from the DTO
      const { name, email, password, confirmPassword } = signupData;
  
      // Check if the user with the same email already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      // Ensure password and confirm password match
      if (password !== confirmPassword) {
        throw new Error('Password and confirm password must match');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create and save the user
      const newUser = this.userRepository.create({ name, email, password: hashedPassword });
      return this.userRepository.save(newUser);
    }
  
    public async signin(signinData: SigninDto): Promise<string> {
      // Destructure properties from the DTO
      const { email, password } = signinData;
  
      // Retrieve the user from the database based on the provided email
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid email or password');
      }
  
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }
      
      // Generate and return a JWT token
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      return token;
    }
  
    public async signout(signoutData: SignoutDto): Promise<void> {
      const { userId, refreshToken } = signoutData;
    
      // Clear session-related data
      await this.sessionService.clearSessionData(userId);
    
      // Remove the token from the logged-in users set
      if (this.loggedUsers.has(refreshToken)) {
        this.loggedUsers.delete(refreshToken);
      }
    }    
    
}

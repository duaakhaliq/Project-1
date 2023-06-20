import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { SessionService } from './session/session.service';
import { SessionEntity } from './session/session-entity.repository';
import { Repository } from 'typeorm';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([UserEntity, SessionEntity]), // Import the UserEntity and SessionEntity repositories using TypeOrmModule.forFeature
    
    JwtModule.register({
      secret: 'mySecretKey123', // Secret key used for token generation
      signOptions: { expiresIn: '1h' }, // Set token expiration time to 1 hour
    }),
  ],
  controllers: [UserController], // Declare the UserController to handle user-related API endpoints
  providers: [UserService, SessionService, SessionEntity, Repository], // Declare the UserService, SessionService, and Repository as providers
  exports: [TypeOrmModule, UserService], // Export the TypeOrmModule and UserService for other modules to use
})
export class UserModule {}

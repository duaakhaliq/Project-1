import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SessionService } from 'src/user/session/session.service';
import { SessionEntity } from 'src/user/session/session.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([UserEntity, SessionEntity, Repository]), // Import UserEntity, SessionEntity,
    JwtModule.register({
      secret: 'mySecretKey123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, SessionService, Repository],
  exports: [AuthService],
})
export class AuthModule {}

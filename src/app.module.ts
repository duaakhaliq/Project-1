import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { SessionService } from './user/session/session.service';
import { SessionEntity } from './user/session/session-entity.repository';
import { Repository } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'user',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'mySecretKey123', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Set token expiration time as per your requirement
    }),
    
    UserModule, AuthModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, Repository, AuthService, UserService, JwtService, SessionService, SessionEntity],
})
export class AppModule {}

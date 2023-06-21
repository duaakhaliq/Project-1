import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  public async createSession(user: UserEntity, refreshToken: string): Promise<SessionEntity> {
    const session = new SessionEntity();
    session.user = user;
    session.refreshToken = refreshToken;
    return this.sessionRepository.save(session);
  }

  public async getSessionByRefreshToken(refreshToken: string): Promise<SessionEntity | undefined> {
    return this.sessionRepository.findOne({ where: { refreshToken } });
  }

  public async deleteSession(sessionId: number): Promise<void> {
    await this.sessionRepository.delete(sessionId);
  }

  public async deleteSessionByUserIdAndRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.sessionRepository.delete({ user: { id: userId }, refreshToken });
  }
}

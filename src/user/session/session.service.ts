import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SessionEntity } from 'src/user/session/session-entity.repository';

@Injectable()
export class SessionService {
  constructor(   
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  public async createSession(userId: string, refreshToken: string): Promise<SessionEntity> {
    const session = new SessionEntity();
    session.userId = userId;
    session.refreshToken = refreshToken;
    return this.sessionRepository.save(session);
  }

  public async clearSessionData(userId: string): Promise<void> {
    await this.sessionRepository.delete({ userId });
  }

  public async findSessionByRefreshToken(refreshToken: string): Promise<SessionEntity | null> {
    return this.sessionRepository.findOneBy({ refreshToken });
  }
}

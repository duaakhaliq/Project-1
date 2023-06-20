import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userId: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

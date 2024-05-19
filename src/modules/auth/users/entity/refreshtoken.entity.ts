import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from 'src/common';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity('refreshToken')
export class RefreshToken extends AbstractEntity<RefreshToken> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 32,
    nullable: true,
  })
  token?: string;

  @AutoMap()
  @ApiProperty()
  @Column()
  expiresAt: Date;

  @AutoMap()
  @ApiProperty()
  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    nullable: true,
  })
  user?: User;
}

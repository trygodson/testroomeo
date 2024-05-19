// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, JoinTable, ManyToOne, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common';
import { User } from 'src/modules/auth/users/entity/users.entity';

@Entity('wallet')
export class Wallet extends AbstractEntity<Wallet> {
  @AutoMap()
  @ApiProperty()
  @Column({
    default: 0.0,
  })
  balance?: number;

  @ManyToOne(() => User, (user) => user.wallet, {
    nullable: true,
  })
  user?: User;
}

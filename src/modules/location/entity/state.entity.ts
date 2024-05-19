// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common';
import { City } from './city.entity';
import { Country } from './country.entity';

export enum ReturnRate {
  MONTHLY = 1,
  ANUALLY = 2,
}

@Entity('state')
export class State extends AbstractEntity<State> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  state_name?: string;

  @OneToMany(() => City, (city) => city.id, {
    nullable: true,
  })
  city?: City[];

  @ManyToOne(() => Country, (country) => country.id, {
    nullable: true,
  })
  country?: Country;
}

// @Schema({ versionKey: false })
// export class User extends AbstractDocument {
//   @Prop()
//   email: string;

//   @Prop()
//   password: string;

//   @Prop()
//   roles: string[];
// }

// export const UserSchema = SchemaFactory.createForClass(User);

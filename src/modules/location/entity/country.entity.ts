// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common';
import { State } from './state.entity';

@Entity('country')
export class Country extends AbstractEntity<Country> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  country_name?: string;

  @OneToMany(() => State, (state) => state.country, {
    nullable: true,
  })
  states?: State[];
}

// export const UserSchema = SchemaFactory.createForClass(User);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common';
import { State } from './state.entity';
import { Property } from 'src/modules/property/entity/property.entity';

@Entity('city')
export class City extends AbstractEntity<City> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  city_name?: string;

  @ManyToOne(() => State, (state) => state.id, {
    nullable: true,
  })
  @JoinColumn()
  state?: State;

  @OneToMany(() => Property, (state) => state.id, {
    nullable: true,
  })
  property?: Property;
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

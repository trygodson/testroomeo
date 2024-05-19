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
import { PropertyImage } from './propertyImage.entity';
import { Country, State, City } from '../../location/entity';

export enum ReturnRate {
  MONTHLY = 1,
  ANUALLY = 2,
}

@Entity('property')
export class Property extends AbstractEntity<Property> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  name?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
  })
  address?: string;

  // @AutoMap()
  // @ApiProperty()
  @ManyToOne(() => City, (city) => city.id, {
    nullable: true,
  })
  @JoinColumn()
  city?: City;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  currency?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  description?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  total_fraction?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  sold_fraction?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  price_per_fraction?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ReturnRate,
    default: ReturnRate.MONTHLY,
  })
  returns_rate?: ReturnRate;

  @OneToMany(() => PropertyImage, (propertyImage) => propertyImage.property, {
    nullable: true,
    cascade: true,
  })
  propertyImage?: PropertyImage[];
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

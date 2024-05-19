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
import { Property } from './property.entity';

@Entity('property_image')
export class PropertyImage extends AbstractEntity<PropertyImage> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  image_path?: string;

  @ManyToOne(() => Property, (property) => property.propertyImage, {
    nullable: true,
  })
  property?: Property;
}

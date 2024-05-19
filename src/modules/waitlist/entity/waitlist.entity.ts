// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common';

@Entity('waitlist')
export class WaitList extends AbstractEntity<WaitList> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  full_name?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
  })
  email?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 15,
  })
  phone?: string;
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

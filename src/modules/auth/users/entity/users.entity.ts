// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../../common/database';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { RefreshToken } from './refreshtoken.entity';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';

export enum Role {
  USER = 1,
  ADMIN = 2,
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum ProfileLevel {
  CREATE = 1,
  UPDATE = 2,
}

@Entity('user')
export class User extends AbstractEntity<User> {
  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  first_name?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 64,
    nullable: true,
  })
  last_name?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 32,
    nullable: true,
    // unique: true,
  })
  email?: string;

  @AutoMap()
  @ApiProperty()
  @Column({
    length: 32,
    nullable: true,
  })
  phone?: string;

  @AutoMap()
  @ApiProperty({})
  @Column({
    length: 64,
  })
  password?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: ProfileLevel,
    nullable: true,
    default: ProfileLevel.CREATE,
  })
  // @ManyToMany(() => Role, { cascade: true })
  // @JoinTable()
  profile_level?: ProfileLevel;

  @AutoMap()
  @ApiProperty({})
  @Column({
    length: 8,
    nullable: true,
  })
  otp_code?: string;

  @AutoMap()
  @ApiProperty({})
  @Column({
    default: false,
    nullable: true,
  })
  otp_verified?: boolean;

  @AutoMap()
  @ApiProperty({})
  @Column({
    nullable: true,
    type: 'date',
  })
  dob?: Date;

  @AutoMap()
  @ApiProperty({})
  @Column({
    nullable: true,
    type: 'date',
  })
  otp_expiry?: Date;

  @AutoMap()
  @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: true })
  // @ManyToMany(() => Role, { cascade: true })
  role?: Role;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    nullable: true,
  })
  refreshTokens?: RefreshToken[];

  @OneToMany(() => Wallet, (wallet) => wallet.user, {
    nullable: true,
  })
  wallet?: Wallet;
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

import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id?: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  @Column({
    default: false,
  })
  is_deleted?: boolean;
}

// For Mongoose
// @Schema()
// export class AbstractDocument {
//   @Prop({ type: SchemaTypes.ObjectId })
//   _id: string;
// }

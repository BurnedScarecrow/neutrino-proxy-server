import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_password')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  user_name: string;

  @Column({ type: 'varchar' })
  password: string;
}

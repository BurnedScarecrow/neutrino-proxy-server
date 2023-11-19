import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_credentials')
export class Access {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  username?: string;

  @Column({ type: 'varchar' })
  api_key: string;
}


import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('portal_request_log')
export class Logger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  ip: string;

  @Column()
  status: string;

  @Column()
  times: string;

  @Column({ type: 'timestamp' })
  create_time: Date;

  @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })//隐藏列
  update_time: Date;
}

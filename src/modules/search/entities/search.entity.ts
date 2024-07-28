
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { customMoment } from '../../../utils/helper'

@Entity('portal_search_record')
export class Search {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  keyword: string;

  @Column()
  ip: string;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   transformer: {
  //     from: (value: string) => new Date(value),
  //     to: (value: Date) => value.toISOString(), // 自定义日期时间格式
  //   }
  // })
  // @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // create_time: number; // 注意类型为 number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  // select: false 隐藏列
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  update_time: Date;

  @BeforeInsert()
  setCreateTime() {
    this.create_time = customMoment();
    this.update_time = customMoment();
  }

  @BeforeUpdate()
  setSaveTime() {
    this.update_time = customMoment();
  }
}

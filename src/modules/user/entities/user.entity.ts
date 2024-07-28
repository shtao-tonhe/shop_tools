import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('th_sys_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  userAccount: string;
}

// @Entity('portal_logger')
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   path: string;

//   @Column()
//   ip: string;

//   @Column()
//   status: string;

//   @Column()
//   times: string;

//   @Column({ type: 'timestamp' })
//   create_time: Date;

//   @Column({ select: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })//隐藏列
//   update_time: Date;
// }

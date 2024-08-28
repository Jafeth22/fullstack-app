import { City } from '@entities/cities/entities/city.entity';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' }) // Name of the table in the DB
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn({ name: 'city_id' }) // The column's name on the DB
  city: City; // One user belongs to one city, weak column
}

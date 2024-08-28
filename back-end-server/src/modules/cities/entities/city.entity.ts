import { User } from '@entities/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities' }) // Name of the table in the DB
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => User, (user) => user.city)
  users: User[]; // Each city has only one user
  // The array is because it could has a lot of something,
  // cities for, this case
}

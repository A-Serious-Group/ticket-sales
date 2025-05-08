
import { Event } from 'src/events/entities/event.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @Column()
  code: string;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "now()::timestamp(0)"
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "now()::timestamp(0)",
    onUpdate: "now()::timestamp(0)"
  })
  public updated_at: Date;
}

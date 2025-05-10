import { Ticket } from 'src/tickets/entities/ticket.entity';
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

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  limit: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[]

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

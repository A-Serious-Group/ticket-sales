import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service'; 
import { TicketController } from './ticket.controller'; 
import { Ticket } from './entities/ticket.entity'; 
import { EventModule } from 'src/events/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    EventModule
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { EventService } from 'src/events/event.service';


@Injectable()
export class TicketService {
  constructor(
    private readonly eventService: EventService,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket[]> {
    try {

      const { event_id, amount } = createTicketDto;
      
      if (!amount || amount <= 0) {
        throw new HttpException(
          'A quantidade de ingressos deve ser maior que zero',
          HttpStatus.BAD_REQUEST
        );
      }

      const event = await this.eventService.findOne(event_id);
      if (!event) {
        throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
      }

      if (event.limit < amount) {
        throw new HttpException(
          `A quantidade máxima de ingressos disponíveis para venda é ${event.limit}`, 
          HttpStatus.BAD_REQUEST
        );
      }

      const createdTickets: Ticket[] = [];

      for (let index = 0; index < amount; index++) {
        const ticket = new Ticket();
        ticket.event_id = event_id;
        ticket.code = 'TICKET_CODE_' + (event.limit - index);

        const saved = await this.ticketRepository.save(ticket);
        createdTickets.push(saved);
      }

      await this.eventService.update(event_id, {
        limit: event.limit - amount,
      });

      return createdTickets;


    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message || 'Internal server error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.ticketRepository.update(id, updateTicketDto);
    return this.ticketRepository.findOne({ where: { id } });
  }  

  async remove(id: number): Promise<string> {
    const ticketToRemove = await this.ticketRepository.findOne({ where: { id } });
    if (!ticketToRemove) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }
    await this.ticketRepository.delete(id);
    return `Ticket with id ${id} was successfully deleted.`;
  }
}

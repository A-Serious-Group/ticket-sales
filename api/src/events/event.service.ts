import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, ILike } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const { name, limit, price, description, image_url } = createEventDto;
  
      if (!limit || limit <= 0) {
        throw new HttpException(
          'O limite de ingressos deve ser maior que zero',
          HttpStatus.BAD_REQUEST
        );
      }
  
      if (!price || price <= 0) {
        throw new HttpException(
          'O valor do ingresso deve ser maior que zero',
          HttpStatus.BAD_REQUEST
        );
      }
  
      const event = this.eventRepository.create({
        name,
        limit,
        price,
        description,
        image_url
      });
  
      return await this.eventRepository.save(event);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
  
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message || 'Erro interno ao criar o evento',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async searchByName(name: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    return this.eventRepository.findOne({ where: { id } });
  }  

  async remove(id: number): Promise<string> {
    const eventToRemove = await this.eventRepository.findOne({ where: { id } });
    if (!eventToRemove) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    await this.eventRepository.delete(id);
    return `Event with id ${id} was successfully deleted.`;
  }
}

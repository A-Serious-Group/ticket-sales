import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventService } from '../events/event.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly eventService: EventService) {}

  async onModuleInit() {
    const existingEvents = await this.eventService.findAll();

    if (existingEvents.length === 0) {
        const defaultEvents = [
            {
                name: 'Homem-Aranha 3',
                limit: 100,
                price: 29.90,
                description: 'Sessão especial do filme Homem-Aranha 3',
                image_url: 'https://res.cloudinary.com/dcaufvn3n/image/upload/v1746834840/uhvopcrkxk59c2fwpref.jpg',
            },
            {
                name: 'Vingadores: Guerra Infinita',
                limit: 150,
                price: 39.90,
                description: 'Exibição de Vingadores: Guerra Infinita',
                image_url: 'https://res.cloudinary.com/dcaufvn3n/image/upload/v1746900406/gccawwhdpdjgalwr8pl1.jpg',
            },
        ];

      for (const event of defaultEvents) {
        await this.eventService.create(event);
        console.log(`Evento '${event.name}' criado.`);
      }
    } else {
      console.log('Eventos já existentes. Nenhum evento foi criado.');
    }
  }
}

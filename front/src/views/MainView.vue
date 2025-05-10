<template>
  <div>
    <h1 class="flex justify-center" style="font-size: 2em;">
      <b>
        Ingressos
      </b>
    </h1>

    <vs-input 
      style="float: right;" 
      class=" mt-5 mb-5 w-full" 
      icon="search" 
      placeholder="Pesquise um Evento" 
      v-model="search"
    />

    <div class="mt-12"></div>
    <vs-row>
      <vs-col 
        v-for="(event, index) in this.events" 
        :key="index" 
        vs-type="flex" 
        vs-justify="center" 
        vs-align="center" 
        vs-w="3"
        class="event-card"
      >
        <div class="event-name">
          {{ event.name }}
        </div>

        <vs-tooltip :text="event.description" position="right" >
          <div class="event-image">
            <img :src="event.image_url" alt="Imagem do evento" class="event-img">
          </div>
        </vs-tooltip>

        <div class="event-limit">
          <span>Ingressos disponíveis: {{ event.limit }}</span>
        </div>

        <vs-button @click="openModalToBuy(event, index)" class="buy-button">
          Comprar
        </vs-button>
      </vs-col>
    </vs-row>

    <vs-popup title="Comprar Ingresso" v-model:active="buyTicketModal" @close="removeVariables()">
      
      <div v-if="codes.length === 0">
        <vs-input-number
          v-if="eventToBuy.event"
          label="Qtd de Ingressos"
          v-model="eventToBuy.quantity"
          :min="1"
          :max="eventToBuy.event.limit"
        />

        <vs-button @click="buyTicket">
          Comprar
        </vs-button>
      </div>

      <div v-else>

        <h1 class="mb-2">
          {{ codes.length > 1 
            ? 'Esses são os códigos dos ingressos!' 
            : 'Esse é o código do seu ingresso!' 
            }}
        </h1> 

        <p v-for="(code, index) in codes" :key="index">
          {{ code.code }}
        </p>

        <vs-button class="mt-2" @click="removeVariables()">
          ENTENDI
        </vs-button>
      </div>

    </vs-popup>

  </div>
</template>
 
<script>
  import event from '@/requests/event';
  import ticket from '@/requests/ticket';

  export default {
    name: 'MainView',
    data: () => ({
      events: [],
      buyTicketModal: false,
      eventToBuy: {
        event: null,
        index: 0,
        quantity: 1
      },
      codes: [],
      search: ''
    }),

    methods: {
      async fetchEvents() {
        await event.fetchAll()
        .then((response) => {
          this.events = response
        });
      },
      openModalToBuy(event, index) {
        this.buyTicketModal = true
        this.eventToBuy = {
          event: event,
          index: index,
          quantity: 1
        }
      },
      async buyTicket() {
        await ticket.create(
          {
            event_id: this.eventToBuy.event.id,
            amount: parseInt(this.eventToBuy.quantity)
          }
        ).then((response) => {
          this.events[this.eventToBuy.index].limit = response[0].event.limit;
          this.eventToBuy = {
            event: null,
            index: 0,
            quantity: 1
          }

          this.codes = response
        })
      },
      removeVariables() {
        this.eventToBuy = {
          event: null,
          index: 0,
          quantity: 1
        }
        this.codes = []
        this.buyTicketModal = false;
      },
      fetchByName(name) {
        if (name.trim() === '') {
          return this.fetchEvents()
        }
        event.getByName(name)
        .then((response) => {
          this.events = response
        })
      }
    },
    async mounted() {
      await this.fetchEvents();
    },
    watch: {
      search(val) {
        console.log(val)
        this.fetchByName(val)
      }
    }
  }
</script>
 
<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 12px;
}

.event-image {
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 12px;
}

.event-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.event-limit {
  font-size: 1em;
  color: #555;
  margin-bottom: 16px;
}

.buy-button {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
}

.buy-button:hover {
  background-color: #0056b3;
}
</style>

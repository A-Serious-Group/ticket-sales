<template>
    <div>
      <vs-navbar v-model="activeItem" class="nabarx">
        <template v-slot:title>
          <vs-navbar-title>
            <a href="/">Ticket Sales</a>
          </vs-navbar-title>
        </template>
        
        <vs-navbar-item index="0">
          <a href="/createEvent">Criar Evento</a>
        </vs-navbar-item>
      </vs-navbar>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      activeItem: 0,
    })
  }
  </script>
  
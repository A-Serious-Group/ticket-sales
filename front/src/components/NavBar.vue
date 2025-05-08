<template>
    <div>
      <vs-navbar v-model="activeItem" class="nabarx">
        <template v-slot:title>
          <vs-navbar-title>
            Ticket Sales
          </vs-navbar-title>
        </template>
        
        <vs-navbar-item index="0">
          <a href="#">Home</a>
        </vs-navbar-item>
        <vs-navbar-item index="1">
          <a href="#">News</a>
        </vs-navbar-item>
        <vs-navbar-item index="2">
          <a href="#">Update</a>
        </vs-navbar-item>
        <vs-input class="" icon="search" placeholder="Pesquise um Evento" v-model="search"/>
      </vs-navbar>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      activeItem: 0,
      search: ''
    })
  }
  </script>
  
<template>
  <NavBar class="px-2 py-1"/>
  <router-view class="px-2 py-1"/>

  <!-- <footer style="text-align: right;" class="footer mr-2 mb-1">
    Todos os Direitos reservados <i class="bi bi-c-circle"></i> A Serious Group - {{ year }}
  </footer> -->
  
</template>

<script>
import NavBar from './components/NavBar.vue';


export default {
  components: {
    NavBar
  },
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    }
  }
}

</script>

<style>
  /* @import '~bootstrap/dist/css/bootstrap.css'; */

  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>
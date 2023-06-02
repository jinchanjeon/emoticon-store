<template>
  <v-app>
    <v-main class="overflow-x-auto">
      <top/>
      <router-view name="Payments"></router-view>
      <router-view name="AdminPayments"></router-view>
      <router-view name="AdminIcon"></router-view>
      <router-view name="Login"></router-view>
      <router-view name="Join"></router-view>
      <router-view name="Home"></router-view>
      <router-view name="SearchPage"></router-view>
      <router-view name="AdminChat"></router-view>
    
    </v-main>
  </v-app>
</template>



<script>
import top from './components/top.vue';

export default{
  name:'app',
  components:{
      top,

  },
  data() {
    //
  },
  
}
</script>


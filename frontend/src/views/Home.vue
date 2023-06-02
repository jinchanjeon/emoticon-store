<template>
  <div class="Home">
    <v-container fluid>
     <icons/>
    </v-container>
  </div>
</template>



<script>

// 검색
// 로그인->로그아웃


// @ is an alias to /src
import icons from '../components/icons.vue'

export default {
  name: 'Home',
  components: {
    icons
  },
  data: () => ({
    //
  }),

}

</script>

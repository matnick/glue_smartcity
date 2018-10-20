<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="green" dark>
               <v-card-title primary class="title">{{$route.path}}
               </v-card-title>
               <v-card-text>
               </v-card-text>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>


<script>
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, Axios);

export default {
  data: () => ({})
};
</script>

<style scoped>
</style>

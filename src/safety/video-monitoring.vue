<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column class="full-height">
         <v-flex d-flex md6>
            <v-layout row wrap fill-height >
               <v-flex d-flex md6 >
                  <v-card color="black" dark>
                     <img class="cam-image" src="http://www.intek-m.ru/img/cams/cam_18/18_camera.jpg?t=1540305191309"/>
                  </v-card>
               </v-flex>
               <v-flex d-flex md6>
                  <v-card color="black" dark>
                     <img class="cam-image" src="http://91.233.230.14/axis-cgi/jpg/image.cgi?dummy=1912692015369" />
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md6>
            <v-layout row wrap fill-height >
               <v-flex d-flex md6 >
                  <v-card color="black" dark>
                     <img class="cam-image" src="http://www.intek-m.ru/img/cams/cam_17/17_camera.jpg" />
                  </v-card>
               </v-flex>
               <v-flex d-flex md6>
                  <v-card color="black" dark>
                     <img class="cam-image" src="http://62.117.66.226:203/axis-cgi/jpg/image.cgi?268328081" />
                  </v-card>
               </v-flex>
            </v-layout>
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
  data: () => ({
    interval: null
  }),
  created: function() {
    this.updateCams()
  },
  beforeDestroy: function() {
    clearInterval(this.interval)
  },
  methods: {
    updateCams: function() {
      this.interval = setInterval(function() {
        const elements = document.querySelectorAll('.cam-image');
        for (let i = 0; i < elements.length; i++) {
           const src = elements[i].src;
           let url = new URL(src);
           url.searchParams.set('t', Date.now());
           elements[i].src = url.href;
        }
      }, 15000)}
    }
};
</script>

<style scoped>
   .cam-image {
      height:44vh;
   }
</style>

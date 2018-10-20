<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="grafana_grey">
               <v-card-text>
                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&orgId=1&panelId=8" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&orgId=1&panelId=9" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&panelId=28&orgId=1" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&panelId=26&orgId=1" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&panelId=24&orgId=1" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&panelId=20&orgId=1" width="100%" height="200" frameborder="0"></iframe>

                  <iframe src="https://sk.iot.nokia.com/grafana/d-solo/MsPbuENmk/weather?refresh=5s&panelId=13&orgId=1" width="100%" height="200" frameborder="0"></iframe>
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

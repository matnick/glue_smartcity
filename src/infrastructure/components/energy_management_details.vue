<template>
   <div>
      <v-dialog v-model="visible" max-width="300px" overlay-hide style="z-index: 1">
         <v-card>
            <v-card-title>
               <div class="title text-xs-center">{{values.name}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">Status: {{values.status}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">Actions</div>
               <v-btn color="primary" @click.native="on">
                  <v-icon left small>fa-plug</v-icon> ON
               </v-btn>
               <v-btn color="primary" @click.native="off">
                  <v-icon left small>fa-power-off</v-icon> OFF
               </v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text v-if="visible" class="no-padding">
               <l-map :zoom="map.zoom" :center="map.center" class="map">
                  <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                  <l-marker :lat-lng="map.marker"></l-marker>
               </l-map>
            </v-card-text>
            <v-card-actions>
               <v-btn color="primary" flat @click.stop="visible=false">Close</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, Axios);

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data: () => ({
    visible: false,
    values: {},
    map: {
      zoom: 15,
      center: {
        lat: "55.659744",
        lng: "37.696447"
      },
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a  href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: {
        lat: "55.659744",
        lng: "37.696447"
      }
    }
  }),
  methods: {
    show(item) {
      this.values = item;
      this.visible = true;
      this.map.center = item.coordinates;
      this.map.marker = item.coordinates;
    },
    on() {
      Vue.axios
        .get("http://localhost:8080/system_actions", {
          params: {
            action: this[l].action
          }
        })
        .then(response => {})
        .catch(error => {});
    },
    off() {}
  }
};
</script>

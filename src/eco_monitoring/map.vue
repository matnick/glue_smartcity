<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column fix-layout>
         <v-flex d-flex md12>
            <v-card>
               <l-map :zoom="map.zoom" :center="map.center">
                  <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                  <colored-heatmap :data="heatmapData"></colored-heatmap>
                  <template v-for="marker in stations">
                     <l-marker :lat-lng="marker.coordinates" @click="$router.push({path: '/eco_monitoring/history'})" v-bind:key="marker.name"></l-marker>
                  </template>
               </l-map>
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

import { LMap, LTileLayer, LMarker, LCircle } from "vue2-leaflet";
import ColoredHeatmap from "../common/colored-heatmap";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    ColoredHeatmap,
    LCircle
  },
  mounted() {
    this.download_data();
  },
  timers: {
    download_data: { time: 5000, autostart: true, repeat: true }
  },

  methods: {
    download_data() {
      Vue.axios
        .get("/we/weather_stations")
        .then(response => {
          this.stations = this.convert_backend_data(response.data);
          this.heatmapData.data = this.stations;
          //console.log(this.heatmapData.data);
          //console.log(this.stations);
        })
        .catch(error => {
          console.log(error);
        });
    },
    convert_backend_data(data) {
      let arr = [];

      Object.keys(data).forEach(item => {
        const element = data[item];
        let station = {};

        Object.keys(element).forEach(item => {
          if (element[item] && element[item].value !== undefined) {
            station[item] = element[item].value;
          }
        });

        station.coordinates = { lat: station.lat, lng: station.lng };
        station.radius = 7000;
        station.color = "#000000";
        console.log(station.aqi);
        station.aqi = parseInt(station.aqi);
        if (station.aqi <= 1) {
          station.color = "#00FF00";
        }
        if (station.aqi > 1) {
          station.color = "#FFFF00";
        }
        if (station.aqi > 2) {
          station.color = "#FF0000";
        }

        arr.push(station);
        //Vue.set(this.heatmapData.data, this.heatmapData.data.length, station);
      });

      return arr;
    },
    update() {
      Vue.axios
        .get("/we/weather_api")
        .then(response => {
          console.log(response.data[14]);
          this.heatmapData.data = response.data;
          this.$timer.stop("update");
          this.timers.update.time = 5000;
          this.$timer.start("update");
        })
        .catch(error => {
          console.log(error);
          this.$timer.stop("update");
          this.timers.update.time = 5000;
          this.$timer.start("update");
        });
    }
  },
  data: () => ({
    map: {
      zoom: 10,
      center: L.latLng(55.697855, 37.634648),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a  href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    heatmapData: {
      min: 1,
      max: 20,
      data: [
        /* { lat: 55.83423792, lng: 37.64075481, radius: 7000, color: "#FF0000" },
        { lat: 55.7552443, lng: 37.61348755, radius: 14000, color: "#00FF00" },
        { lat: 55.68098578, lng: 37.70412475, radius: 7000, color: "#0000FF" },
        { lat: 55.86790868, lng: 37.51461059, radius: 7000, color: "#FF00FF" },
        { lat: 55.77455929, lng: 37.48027832, radius: 7000, color: "#FFFF00" },
        { lat: 55.69259798, lng: 37.54756958, radius: 21000, color: "#FF0000" },
        { lat: 55.61511815, lng: 37.61211426, radius: 7000, color: "#00FF00" },
        { lat: 55.83398936, lng: 37.73296387, radius: 7000, color: "#0000FF" } */
      ]
    },
    stations: []
  })
};
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";

.container.fill-height .layout.fix-layout {
  height: calc(100% + 8px);
}

.container.fill-height .layout.fix-layout-large {
  height: calc(100% + 16px);
}

.move-top {
  margin-top: -8px;
}
</style>

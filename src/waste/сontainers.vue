<template>
   <v-container grid-list-md fill-height fluid>

      <v-layout column fix-layout>
         <v-flex d-flex md7>
            <v-layout fix-layout row>
               <v-flex d-flex md6 class="table-block">
                  <binstable ref="binstable" @row_clicked="table_click" :bins="containers"></binstable>
               </v-flex>
               <v-flex d-flex md6>
                  <v-layout fix-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <l-map :zoom="map.zoom" style="z-index: 5" :center="map.center">
                              <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                              <template v-for="container in containers">
                                 <l-marker :lat-lng="container.coordinates" @click="map_marker_click" v-bind:key="container.name" :icon="get_marker_icon(container.selected)"></l-marker>
                              </template>
                           </l-map>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md5>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md5>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="cyan lighten-2" dark>
                           <v-card-title primary class="title">Waste collection efficiency
                           </v-card-title>
                           <v-card-text class="pt-0 chart">
                              <bar-chart :data="daily_filling_levels_chart.data" :maxValue="100" barColor="#BDBDBD" :fillParent="true"></bar-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md2>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="indigo lighten-2" dark>
                           <v-card-title primary class="title">Filling level
                           </v-card-title>
                           <v-card-text class="pt-0 chart">
                              <donut-chart :data="waste_filling_levels_chart.data"></donut-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md2>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="blue lighten-3" dark>
                           <v-card-title primary class="title">Online
                           </v-card-title>
                           <v-card-text class="pt-0">
                              <span class="display-3 mx-auto">{{ containers_online }}/{{ containers.length }}</span>
                              <span class="display-1"> containers online</span>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md3>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="teal lighten-2" dark>
                           <v-card-title primary class="title">Batteries
                           </v-card-title>
                           <v-card-text class="pt-0 chart">
                              <donut-chart :data="battery_levels_chart.data"></donut-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
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

import binstable from "./components/binstable.vue";
Vue.component("binstable", binstable);

import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

import * as d3 from "d3";
import charts from "../v-charts";
Vue.use(charts);
Object.defineProperty(Vue.prototype, "$d3", { value: d3 });

import DonutChart from "../common/charts/DonutChart";
import BarChart from "../common/charts/BarChart";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    DonutChart,
    BarChart
  },
  data: () => ({
    daily_filling_levels_chart: {
      dim: "name",
      height: "150",
      width: "150",
      selector: "#daily_filling_levels_chart",
      metric: "value",
      data: {}
    },
    map: {
      zoom: 12,
      center: L.latLng(55.697247, 37.357755),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    selected: [],
    online: 0
  }),
  mounted: function() {
    this.$store.dispatch("getWasteData").then(() => {
        this.daily_filling_levels_chart.data = this.calc_daily_filling_levels();
        this.waste_interval = setInterval(function () {
            this.$store.dispatch("getWasteData");
        }.bind(this), 3000);
    }).catch();
    console.log(this.battery_levels_chart.data);
  },
    computed: {
        containers () {
            return this.$store.getters.getWasteMarkers;
        },
        waste_filling_levels_chart() {
            return this.$store.getters.getWasteLevelsFillingChart;
        },
        battery_levels_chart() {
            return this.$store.getters.getBatteriesLevelsChart;
        },
        containers_online () {
            return this.containers.filter(function(data){
                return data.status === "online"
            }).length;
        }
    },
    beforeDestroy: function() {
        clearInterval(this.waste_interval);
    },
  methods: {
    showbindetails(item) {
      this.$refs.bindetails.show(item);
    },
    map_marker_click(event) {
      let container;
      for (let index = 0; index < this.containers.length; index++) {
        this.containers[index].selected = false;
        if (
          event.latlng.lat == this.containers[index].coordinates.lat &&
          event.latlng.lng == this.containers[index].coordinates.lng
        ) {
          container = this.containers[index];

          container.selected = true;
          this.map.center = L.latLng(0, 0);
          this.map.center.lat = container.coordinates.lat;
          this.map.center.lng = container.coordinates.lng;
        }
      }
    },
    table_click(item) {
      this.containers.forEach(container => {
        container.selected = false;
      });
      item.selected = true;
      this.map.center.lat = item.coordinates.lat;
      this.map.center.lng = item.coordinates.lng;
      this.map.zoom = 15;
    },
    calc_daily_filling_levels() {
      const start=new Date()-7*86400000;
      return [10,27,63,89,69,12,80].map(function(x,i) {
	     return {title:new Date(start+i*86400000).toLocaleDateString(),value:x};
	   });
    },
    get_marker_icon(selected) {
      const url = selected
        ? require("../assets/marker-active.svg")
        : require("../assets/marker.svg");

      return L.icon({
        iconUrl: url,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });
    }
  }
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

.table-block {
  height: calc(100% - 8px);
  padding: 0;
  margin: 4px 4px 0 4px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.table-block > * {
  max-width: 100%;
}
</style>

<style scoped>
.chart {
  height: calc(100% - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 32px;
}
</style>
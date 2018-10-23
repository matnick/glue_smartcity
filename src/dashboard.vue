<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column>
         <v-flex d-flex md4>
            <v-layout  row wrap>
               <v-flex d-flex md3>
                  <v-card :color="waste.color" to="/waste/containers">
                     <v-card-title primary class="title">{{$t("message.waste")}}
                        <v-spacer></v-spacer>
                        <v-icon>fa-trash</v-icon>
                     </v-card-title>
                     <v-card-text class="pt-0 chart">
                        <donut-chart :data="waste.data"></donut-chart>
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md3>
                  <v-card :color="parking.color" to="/parking/map">
                     <div class="chart-background">
                        <bar-chart :data="parking.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                     </div>
                     <v-card-title primary class="title">{{$t("message.parking")}}
                        <v-spacer></v-spacer>
                        <v-icon>fa-car</v-icon>
                     </v-card-title>
                     <v-card-text>
                        <span class="title">{{$t("message.free")}}: </span>
                        <span class="headline">{{ get_randomized_value(parking.free) }} %</span><br>
                        <span class="title">{{$t("message.average_park_time")}}: </span>
                        <span class="headline">{{ parking.time }} {{$t("message.minutes_short")}}</span>
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md3>
                  <v-card :color="lamps.color" to="/lighting/main">
                     <div class="chart-background">
                        <bar-chart :data="lamps.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                     </div>
                     <v-card-title primary class="title">{{$t("message.smart_lighting")}}
                        <v-spacer></v-spacer>
                        <v-icon>fa-lightbulb</v-icon>
                     </v-card-title>
                     <v-card-text>
                        <span class="title">{{$t("message.lamps_on")}}: </span>
                        <span class="headline">{{ get_randomized_value(lamps.power_on) }}/{{ lamps.all }}</span><br>
                        <span class="title">{{$t("message.consumption")}}: </span>
                        <span class="headline">{{ get_randomized_value(lamps.power) }} {{$t("message.kilowatt")}}</span>
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md3>
                  <v-card :color="video.color" to="/safety/video-monitoring" class="card-image" style="background-image: url(http://www.intek-m.ru/img/cams/cam_17/17_camera.jpg)">
                     <v-card-title primary class="title">{{$t("message.video")}}
                        <v-spacer></v-spacer>
                        <v-icon>fa-video</v-icon>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md8>
            <v-layout row wrap>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="blue">
                           <l-map :zoom="map.zoom" :center="map.center">
                              <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                              <template v-for="marker in getMarkers">
                                 <l-marker :lat-lng="marker.coordinates" v-bind:key="marker.name"></l-marker>
                              </template>
                           </l-map>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md6>
                  <v-layout column>
                     <v-flex d-flex md6>
                        <v-layout row wrap>
                           <v-flex  d-flex md12>
                              <v-layout  row wrap>
                                 <v-flex d-flex md6>
                                    <v-card :color="meters.color" to="/metering/company">
                                       <div class="chart-background">
                                          <bar-chart :data="meters.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                                       </div>
                                       <v-card-title primary class="title">{{$t("message.meters")}}
                                          <v-spacer></v-spacer>
                                          <v-icon>fa-tachometer-alt</v-icon>
                                       </v-card-title>
                                       <v-card-text>
                                          <span class="title">{{$t("message.households_in")}}: </span>
                                          <span class="headline">{{ meters.households }} %</span><br>
                                          <span class="title">{{$t("message.power")}}: </span>
                                          <span class="headline">{{ get_randomized_value(meters.power) }} {{$t("message.kilowatt")}}</span><br>
                                          <span class="title">{{$t("message.water")}}: </span>
                                          <span class="headline">{{ get_randomized_value(meters.water) }} {{$t("message.meters_cubic")}}</span><br>
                                          <span class="title">{{$t("message.gas")}}: </span>
                                          <span class="headline">{{ get_randomized_value(meters.gas) }} {{$t("message.meters_cubic")}}</span><br>
                                       </v-card-text>
                                    </v-card>
                                 </v-flex>
                                 <v-flex d-flex md6>
                                    <v-layout  row wrap>
                                       <v-flex d-flex md6>
                                          <v-card :color="air.color" to="/eco_monitoring/map">
                                             <div class="chart-background">
                                                <bar-chart :data="air.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                                             </div>
                                             <v-card-title primary class="title">{{$t("message.air")}}
                                                <v-spacer></v-spacer>
                                                <v-icon>fa-tree</v-icon>
                                             </v-card-title>
                                             <v-card-text>
                                                <span class="title">{{$t("message.quality_grade")}}: </span>
                                                <span class="headline">{{ air.grade }}</span>
                                             </v-card-text>
                                          </v-card>
                                       </v-flex>
                                       <v-flex d-flex md6>
                                          <v-card :color="weather.color" to="/eco_monitoring/stations">
                                             <v-card-title primary class="title">
                                                <v-spacer></v-spacer>
                                                <v-icon>fa-cloud</v-icon>
                                             </v-card-title>
                                             <v-card-text>
                                                <span class="title">{{$t("message.weather")}} </span>
                                                <span class="headline">{{ weather.temp }}C</span>
                                             </v-card-text>
                                          </v-card>
                                       </v-flex>
                                    </v-layout>
                                 </v-flex>
                              </v-layout>
                           </v-flex>
                        </v-layout>
                     </v-flex>
                     <v-flex d-flex md6>
                        <v-layout row wrap>
                           <v-flex d-flex md12>
                              <v-card :color="power.color" to="metering/meters">
                                 <div class="chart-background">
                                    <bar-chart :data="power.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                                 </div>
                                 <v-card-title primary class="title">{{$t("message.energy_supply")}}
                                    <v-spacer></v-spacer>
                                    <v-icon>fa-chart-bar</v-icon>
                                 </v-card-title>
                                 <v-card-text>
                                    <span class="title">{{$t("message.consumption")}}: </span>
                                    <span class="headline">{{ get_randomized_value(power.value) }} {{$t("message.gigawatt_per_hour")}}</span><br>
                                    <span class="title">{{$t("message.incidents")}}: </span>
                                    <span class="headline">{{ power.incidents }}</span>
                                 </v-card-text>
                              </v-card>
                           </v-flex>
                        </v-layout>
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

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

import DonutChart from "./common/charts/DonutChart";
import BarChart from "./common/charts/BarChart";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    DonutChart,
    BarChart
  },
  data: () => ({
    map: {
      zoom: 12,
      center: L.latLng(55.697247, 37.357755),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        markers: [
        ],
    },
    interval:null,
    parking: {
      free: 61,
      time: 18,
      color: "nokia_gray_2",
      chartData: [
        { title: "5 июля", value: 1 },
        { title: "6 июля", value: 2 },
        { title: "7 июля", value: 1 },
        { title: "8 июля", value: 1 },
        { title: "9 июля", value: 2 },
        { title: "10 июля", value: 4 },
        { title: "11 июля", value: 3 }
      ]
    },
    lamps: {
      power_on: 42,
      all: 421,
      power: 527,
      color: "nokia_green",
      chartData: [
        { title: "5 июля", value: 3 },
        { title: "6 июля", value: 3 },
        { title: "7 июля", value: 3 },
        { title: "8 июля", value: 4 },
        { title: "9 июля", value: 3 },
        { title: "10 июля", value: 3 },
        { title: "11 июля", value: 3 }
      ]
    },
    video: {
      color: "nokia_green"
    },
    meters: {
      households: "21",
      power: "473",
      water: "870",
      gas: "320",
      color: "nokia_yellow",
      chartData: [
        { title: "5 июля", value: 3 },
        { title: "6 июля", value: 4 },
        { title: "7 июля", value: 6 },
        { title: "8 июля", value: 8 },
        { title: "9 июля", value: 6 },
        { title: "10 июля", value: 8 },
        { title: "11 июля", value: 9 }
      ]
    },
    air: {
      grade: "1",
      color: "nokia_green",
      chartData: [
        { title: "5 июля", value: 2 },
        { title: "6 июля", value: 3 },
        { title: "7 июля", value: 1 }
      ]
    },
    weather: {
      temp: "+23",
      color: "nokia_green"
    },
    power: {
      value: "90",
      incidents: 2,
      color: "nokia_red",
      chartData: [
        { title: "5 июля", value: 13 },
        { title: "6 июля", value: 12 },
        { title: "7 июля", value: 14 },
        { title: "8 июля", value: 13 },
        { title: "9 июля", value: 12 },
        { title: "10 июля", value: 12 },
        { title: "11 июля", value: 17 },
        { title: "12 июля", value: 18 },
        { title: "13 июля", value: 10 },
        { title: "14 июля", value: 12 },
        { title: "15 июля", value: 13 },
        { title: "16 июля", value: 12 },
        { title: "17 июля", value: 12 },
        { title: "18 июля", value: 14 }
      ]
    },
    random_interval: null
  }),
  created: function() {
    this.update_random_values();
  },
  beforeDestroy: function() {
    clearInterval(this.random_interval);
    clearInterval(this.waste_interval);
  },
  methods: {
    update_random_values: function() {
      let that = this;
      this.random_interval = setInterval(function() {
        that.$forceUpdate();
      }, 3000);
    },
    get_randomized_value: function(value) {
      const min_value = value * 0.98;
      const randomizer = value * 0.05 * Math.random();
      return parseInt(min_value + randomizer);
    },
  },
    mounted: function() {
        this.$store.dispatch("getWasteData").then(()=>{
            this.waste_interval = setInterval(function () {
                this.$store.dispatch("getWasteData");
            }.bind(this), 3000);
        }).catch();
    },
    computed: {
        getMarkers () {
            return this.$store.getters.getWasteMarkers;
        },
        waste () {
            return this.$store.getters.getWasteLevelsFillingChart;
        }
    },
};
</script>

<style scoped>
   .chart {
      height: calc(100% - 56px);
   }
</style>
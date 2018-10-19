<template>
   <v-container grid-list-md fill-height fluid>

      <v-layout column >
         <v-flex d-flex md7>
            <v-layout row wrap>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <l-map :zoom="map.zoom" style="z-index: 5" :center="map.center">
                              <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                              <template v-for="parking in parkings">
                                 <l-polygon :lat-lngs="parking.polygone_coordinates" :color="get_polygon_color(parking)" v-bind:key="parking.name">
                                    <l-popup :content="generate_text(parking.places, parking.free, parking.name)"></l-popup>
                                 </l-polygon>
                              </template>
                           </l-map>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-layout column="">
                           <v-flex d-flex md12 class="table-block">
                              <parking-table ref="parkingTable" @parking_row_clicked="table_click" :data="parkings"></parking-table>
                           </v-flex>
                        </v-layout>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md5>
            <v-layout row wrap>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="blue lighten-3" dark>
                           <v-card-title primary class="title">{{$t("message.total_parking_load")}}</v-card-title>
                           <v-card-text class="pt-0 chart">
                              <donut-chart :data="this.get_free_chart_data()"></donut-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="green lighten-3" dark>
                           <v-card-title primary class="title">{{$t("message.parking_congestion")}}</v-card-title>
                           <v-card-text class="pt-0 chart">
                              <donut-chart :data="this.get_used_parkings_stats()"></donut-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="teal lighten-3" dark>
                           <v-card-title primary class="title">{{$t("message.max_occupancy_per_day")}}</v-card-title>
                           <v-card-text class="pt-0 chart">
                              <bar-chart :data="this.get_random_data()" :fillParent="true"></bar-chart>
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
import moment from "moment";
import Vue_i18n from 'vue-i18n';
import "moment/locale/ru";
Vue.use(VueAxios, Axios, Vue_i18n);

import { LMap, LTileLayer, LPolygon, LPopup } from "vue2-leaflet";

import DonutChart from "./../common/charts/DonutChart";
import BarChart from "./../common/charts/BarChart";

import table from "./components/table.vue";

const DATE_FORMAT = "DD MMM";

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LPopup,
    parkingTable: table,
    DonutChart,
    BarChart
  },
  data: () => ({
    map: {
      zoom: 13,
      center: L.latLng(55.696767, 37.356644),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a  href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    },
    polygon_color: "#ff00ff",
    polygon_color_active: "#ffff00"
  }),
  methods: {
    generate_text(all_places, free, name) {
      let occuped = all_places - free;
      let occuped_percent = Math.round(occuped / (all_places / 100));
      let text =
        name +
        "<br>" +
        this.$i18n.t("message.all") + ": " +
        all_places +
        "<br>" +
        this.$i18n.t("message.occupied") + ": " +
        occuped +
        " (" +
        occuped_percent +
        "%)" +
        "<br>" +
        this.$i18n.t("message.free") + ": " +
        free;
      return text;
    },
    table_click(item) {
      this.parkings.forEach(container => {
        container.selected = false;
      });
      item.selected = true;
      this.map.center = L.latLng(
        item.polygone_coordinates[0][0],
        item.polygone_coordinates[0][1]
      );
      this.map.zoom = 17;
    },
    show_details(item) {
      this.$refs.parkingTable.show(item);
    },
    get_free_chart_data() {
      let free = 0;
      let placesTotal = 0;

      this.parkings.forEach(item => {
        free = free + item.free;
        placesTotal = placesTotal + item.places;
      });

      return [
        { title: this.$i18n.t("message.free"), value: free, color: "#039BE5" },
        { title: this.$i18n.t("message.occupied"), value: placesTotal - free, color: "#8D6E63" }
      ];
    },
    get_used_parkings_stats() {
      let levelFirst = 0;
      let levelSecond = 0;
      let levelThird = 0;

      this.parkings.forEach(item => {
        const freePercent = item.free / item.places;

        if (freePercent < 0.2) {
          levelFirst++;
        } else if (freePercent < 0.7) {
          levelSecond++;
        } else {
          levelThird++;
        }
      });

      return [
        { title: "<20%", value: levelFirst, color: "#039BE5" },
        { title: "<70%", value: levelSecond, color: "#8D6E63" },
        { title: ">70%", value: levelThird, color: "#D4E157" }
      ];
    },
    get_random_data() {
      return [
        {
          title: moment()
            .subtract(6, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment()
            .subtract(5, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment()
            .subtract(4, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment()
            .subtract(3, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment()
            .subtract(2, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment()
            .subtract(1, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        },
        {
          title: moment().format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 40 + 40)
        }
      ];
    },
    get_polygon_color(parking) {
      if (parking.selected) {
        return this.polygon_color_active;
      }

      return this.polygon_color;
    }
  },
  computed : {
      parkings () {
          return [
              {
                  "polygone_coordinates": [
                      [
                          55.696767,
                          37.356644
                      ],
                      [
                          55.696364,
                          37.356644
                      ],
                      [
                          55.696354,
                          37.357194
                      ],
                      [
                          55.696776,
                          37.357199
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #1",
                  "places": 38,
                  "free": 29,
                  "selected": false,
                  "address": "Парковка гиперкуба 1",
                  "sensor_type": this.$i18n.t("message.video_analytics_sensor")
              },
              {
                  "polygone_coordinates": [
                      [
                          55.696529,
                          37.354085
                      ],
                      [
                          55.696404,
                          37.354082
                      ],
                      [
                          55.696401,
                          37.355214
                      ],
                      [
                          55.696538,
                          37.355228
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #2",
                  "places": 41,
                  "free": 12,
                  "selected": false,
                  "address": "Парковка гиперкуба 2",
                  "sensor_type": this.$i18n.t("message.magnet_sensor")
              },
              {
                  "polygone_coordinates": [
                      [
                          55.696522,
                          37.359247
                      ],
                      [
                          55.696506,
                          37.361262
                      ],
                      [
                          55.696468,
                          37.361264
                      ],
                      [
                          55.696465,
                          37.359261
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #3",
                  "places": 5,
                  "free": 2,
                  "selected": false,
                  "address": "Парковка матрешки",
                  "sensor_type": this.$i18n.t("message.volume_sensor")
              },
              {
                  "polygone_coordinates": [
                      [
                          55.688794,
                          37.355936
                      ],
                      [
                          55.688842,
                          37.354037
                      ],
                      [
                          55.687066,
                          37.354316
                      ],
                      [
                          55.687066,
                          37.354584
                      ],
                      [
                          55.686824,
                          37.354745
                      ],
                      [
                          55.686794,
                          37.355421
                      ],
                      [
                          55.688327,
                          37.355926
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #4",
                  "places": 115,
                  "free": 54,
                  "selected": false,
                  "address": "Парковка сколковская",
                  "sensor_type": this.$i18n.t("message.video_analytics")
              },
              {
                  "polygone_coordinates": [
                      [
                          55.686471,
                          37.335783
                      ],
                      [
                          55.686138,
                          37.336759
                      ],
                      [
                          55.687292,
                          37.338111
                      ],
                      [
                          55.68762,
                          37.337124
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #5",
                  "places": 54,
                  "free": 23,
                  "selected": false,
                  "address": "",
                  "sensor_type": this.$i18n.t("message.video_analytics")
              },
              {
                  "polygone_coordinates": [
                      [
                          55.688027,
                          37.336057
                      ],
                      [
                          55.687739,
                          37.337296
                      ],
                      [
                          55.687451,
                          37.338278
                      ],
                      [
                          55.687538,
                          37.338495
                      ],
                      [
                          55.688475,
                          37.338264
                      ],
                      [
                          55.688869,
                          37.337094
                      ]
                  ],
                  "name": this.$i18n.t("message.parking_single")+" #6",
                  "places": 55,
                  "free": 10,
                  "selected": false,
                  "address": "",
                  "sensor_type": this.$i18n.t("message.magnet_sensor")
              }
          ]
      }
  }
};
</script>

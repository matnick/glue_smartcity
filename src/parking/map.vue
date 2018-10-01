<template>
   <v-container grid-list-md fill-height fluid>

      <v-layout column fix-layout>
         <v-flex d-flex md7>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md6>
                  <v-layout fix-layout row wrap>
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
                  <v-layout fix-layout row wrap>
                     <v-flex d-flex md12>
                        <v-layout fix-layout column="">
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
            <v-layout fix-layout row wrap>
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

import parking_data from "!json-loader!./parking.json";
import table from "./components/table.vue";

const DATE_FORMAT = "DD MMMM";

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
    parkings: parking_data,
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
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment()
            .subtract(5, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment()
            .subtract(4, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment()
            .subtract(3, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment()
            .subtract(2, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment()
            .subtract(1, "days")
            .format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        }
      ];
    },
    get_polygon_color(parking) {
      if (parking.selected) {
        return this.polygon_color_active;
      }

      return this.polygon_color;
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

.card-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart {
  height: calc(100% - 56px);
}
</style>

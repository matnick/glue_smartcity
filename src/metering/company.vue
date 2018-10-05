<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column fix-layout>
         <v-flex d-flex md4>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-layout fix-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <l-map :zoom="map.zoom" style="z-index: 5" :center="map.center">
                              <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                              <template v-for="house in houses">
                                 <l-polygon @click="polygon_click(house)" :lat-lngs="house.polygone_coordinates"
                                            :color="get_polygon_color(house)" v-bind:key="house.name">
                                 </l-polygon>
                              </template>
                           </l-map>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md8>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-layout fix-layout column="">
                           <v-flex d-flex md12 class="table-block">
                              <houses-table ref="housesTable" @house_row_clicked="table_click"
                                            :data="houses"></houses-table>
                           </v-flex>
                        </v-layout>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md1>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md12>
                  <h2 class="text-center mt-2">
                     {{active_item.street_name}}, {{$t("message.house_prefix")}} {{active_item.house_number}}.
                     {{$t("message.total_appartments")}}: {{active_item.information.total_appartments}}
                  </h2>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md3>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-layout fix-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <div class="chart-background">
                              <bar-chart :data="active_item.measurements.cold_water.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                           </div>
                           <v-card-title primary class="title">{{$t("message.cold_water_supply")}}</v-card-title>
                           <v-card-text>
                              <span>{{$t("message.total_house_consumption")}}: {{active_item.measurements.cold_water.total}} {{$t("message.meters_cubic")}}</span><br>
                              <span v-bind:class="isDeviant(active_item.measurements.cold_water.total, active_item.measurements.cold_water.counters)">{{$t("message.total_consumption_from_counters")}}: {{active_item.measurements.cold_water.counters}} {{$t("message.meters_cubic")}}</span>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <div class="chart-background">
                              <bar-chart :data="active_item.measurements.hot_water.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                           </div>
                           <v-card-title primary class="title">{{$t("message.hot_water_supply")}}</v-card-title>
                           <v-card-text>
                              <span>{{$t("message.total_house_consumption")}}: {{active_item.measurements.hot_water.total}} {{$t("message.meters_cubic")}}</span><br>
                              <span v-bind:class="isDeviant(active_item.measurements.hot_water.total, active_item.measurements.hot_water.counters)">{{$t("message.total_consumption_from_counters")}}: {{active_item.measurements.hot_water.counters}} {{$t("message.meters_cubic")}}</span>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <div class="chart-background">
                              <bar-chart :data="active_item.measurements.energy.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                           </div>
                           <v-card-title primary class="title">{{$t("message.energy_supply")}}</v-card-title>
                           <v-card-text>
                              <span>{{$t("message.total_house_consumption")}}: {{active_item.measurements.energy.total}} {{$t("message.kilowatt_per_hour")}}</span><br>
                              <span v-bind:class="isDeviant(active_item.measurements.energy.total, active_item.measurements.energy.counters)">{{$t("message.total_consumption_from_counters")}}: {{active_item.measurements.energy.counters}} {{$t("message.kilowatt_per_hour")}}</span>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md4>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <div class="chart-background">
                              <bar-chart :data="active_item.measurements.energy.chartData" :hideAxis="true" :isDashboard="true"></bar-chart>
                           </div>
                           <v-card-title primary class="title">{{$t("message.gas_supply")}}</v-card-title>
                           <v-card-text>
                              <span>{{$t("message.total_house_consumption")}}: {{active_item.measurements.gas.total}} {{$t("message.meters_cubic")}}</span><br>
                              <span v-bind:class="isDeviant(active_item.measurements.gas.total, active_item.measurements.gas.counters)">{{$t("message.total_consumption_from_counters")}}: {{active_item.measurements.gas.counters}} {{$t("message.meters_cubic")}}</span>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md8>
                  <v-layout row wrap>
                     <v-flex d-flex md12 class="table-block">
                        <eventsTable :data="active_item.events"></eventsTable>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
      </v-layout>
      <detail ref="housesTable"></detail>
   </v-container>
</template>

<script>
    import Vue from "vue";
    import Axios from "axios";
    import VueAxios from "vue-axios";
    import Vue_i18n from 'vue-i18n';
    Vue.use(VueAxios, Axios, Vue_i18n);

    import { LMap, LTileLayer, LMarker, LPolygon, LPopup } from "vue2-leaflet";

    import DonutChart from "./../common/charts/DonutChart";
    import BarChart from "./../common/charts/BarChartMeters";
    import houses_data from "!json-loader!./houses.json";
    import table from "./components/table.vue";
    import events_table from "./components/events-table.vue";
    import detail from "./components/detail.vue";

    export default {
        components: {
            LMap,
            LTileLayer,
            LPolygon,
            LMarker,
            LPopup,
            detail,
            housesTable: table,
            eventsTable: events_table,
            DonutChart,
            BarChart
        },
        data: () => ({
            map: {
                zoom: 15,
                center: L.latLng(55.730407, 37.4184101),
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution:
                    '&copy; <a  href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            },
            houses: houses_data,
            polygon_color: "#ff00ff",
            polygon_color_active: "#ffff00",
            active_item: {
                "information" : {},
                "announcements": {},
                "measurements": {
                    "cold_water": {"chartData":[]},
                    "hot_water": {"chartData":[]},
                    "energy": {"chartData":[]},
                    "gas": {"chartData":[]},
                },
                "events": {}
            }
        }),
        methods: {
            table_click(item) {
                this.active_item = item;
                this.houses.forEach(container => {
                    container.selected = false;
                });
                item.selected = true;
                this.map.center = L.latLng(
                    item.polygone_coordinates[0][0],
                    item.polygone_coordinates[0][1]
                );
                this.map.zoom = 16;
            },
            show_details(item) {
                this.$refs.housesTable.show(item);
            },
           polygon_click(house) {
               house.selected = true;
               this.active_item.selected = false;
               this.active_item = house;
            },
            get_polygon_color(house) {
                if (house.selected) {
                    return this.polygon_color_active;
                }
                return this.polygon_color;
            },
            isDeviant (val1, val2) {
                if (val1 - val2 > 500) {
                    return "deviant";
                }
            }
        },
        mounted: function () {
            this.active_item = houses_data[0];
            this.active_item.selected = true;
        }
    };
</script>

<style>
   @import "../../node_modules/leaflet/dist/leaflet.css";

   .table-block {
      height: 100%;
      padding: 0;
      margin: 4px 4px 0 4px;
      background-color: white;
      box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      0 1px 3px 0 rgba(0, 0, 0, 0.12);
   }

   .chart {
      height:82%;
   }

   .bar-chart {
      align-self: flex-end;
   }

   .deviant {
      color: red;
   }

   .chart-background {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      opacity: 0.3;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 1;
   }
</style>

<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column fix-layout>
         <v-flex d-flex md1>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md12>
                  <v-card-title primary class="title text-center">
                     <span>{{personal.name}}, {{personal.address}}</span>
                  </v-card-title>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md3>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-card>
                     <v-card-title primary class="title">{{$t("message.cold_water_supply")}}</v-card-title>
                     <v-card-text>
                        {{$t("message.total")}}: {{personal.measurements.cold_water.total}}
                        {{$t("message.meters_cubic")}}<br>
                        {{$t("message.this_month")}}: {{personal.measurements.cold_water.this_month}}
                        {{$t("message.meters_cubic")}}<br>
                        {{$t("message.payment_due")}}: {{personal.measurements.cold_water.sum}}
                        {{$t("message.roubles_short")}}
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md8>
                  <v-card>
                     <v-card-text class="pt-0 chart">
                        <bar-chart class="bar-chart" :data="personal.measurements.cold_water.chartData"
                                   :fillParent="true"></bar-chart>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md3>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-card>
                     <v-card-title primary class="title">{{$t("message.hot_water_supply")}}</v-card-title>
                     <v-card-text>
                        {{$t("message.total")}}: {{personal.measurements.hot_water.total}}
                        {{$t("message.meters_cubic")}}<br>
                        {{$t("message.this_month")}}: {{personal.measurements.hot_water.this_month}}
                        {{$t("message.meters_cubic")}}<br>
                        {{$t("message.payment_due")}}: {{personal.measurements.hot_water.sum}}
                        {{$t("message.roubles_short")}}
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md8>
                  <v-card>
                     <v-card-text class="pt-0 chart">
                        <bar-chart class="bar-chart" :data="personal.measurements.hot_water.chartData"
                                   :fillParent="true"></bar-chart>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md3>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-card>
                     <v-card-title primary class="title">{{$t("message.energy_supply")}}</v-card-title>
                     <v-card-text>
                        {{$t("message.total")}}: {{personal.measurements.energy.total}}
                        {{$t("message.kilowatt_per_hour")}}<br>
                        {{$t("message.this_month")}}: {{personal.measurements.energy.this_month}}
                        {{$t("message.kilowatt_per_hour")}}<br>
                        {{$t("message.payment_due")}}: {{personal.measurements.energy.sum}}
                        {{$t("message.roubles_short")}}
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md8>
                  <v-card>
                     <v-card-text class="pt-0 chart">
                        <bar-chart class="bar-chart" :data="personal.measurements.energy.chartData"
                                   :fillParent="true"></bar-chart>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md3>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md4>
                  <v-card>
                     <v-card-title primary class="title">{{$t("message.gas_supply")}}</v-card-title>
                     <v-card-text>
                        {{$t("message.total")}}: {{personal.measurements.gas.total}} {{$t("message.meters_cubic")}}<br>
                        {{$t("message.this_month")}}: {{personal.measurements.gas.this_month}}
                        {{$t("message.meters_cubic")}}<br>
                        {{$t("message.payment_due")}}: {{personal.measurements.gas.sum}} {{$t("message.roubles_short")}}
                     </v-card-text>
                  </v-card>
               </v-flex>
               <v-flex d-flex md8>
                  <v-card>
                     <v-card-text class="pt-0 chart">
                        <bar-chart class="bar-chart" :data="personal.measurements.gas.chartData"
                                   :fillParent="true"></bar-chart>
                     </v-card-text>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md1>
            <v-layout fix-layout row wrap>
               <v-flex d-flex md12>
                  <v-card-title primary class="title text-center">
                     {{$t("message.total_due_this_month")}}: {{personal.payment_total_this_month}}
                     {{$t("message.roubles_short")}} <v-icon color="red">fas fa-arrow-up</v-icon>
                  </v-card-title>
                  <v-card-title primary class="title text-center">
                     {{$t("message.house_average")}}:
                     {{personal.payment_house_average}} {{$t("message.roubles_short")}}
                  </v-card-title>
                  <v-card-title primary class="title text-center">
                     {{$t("message.total_previous_month")}}: {{personal.payment_total_last_month}}
                     {{$t("message.roubles_short")}}
                  </v-card-title>
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

    import { LMap, LTileLayer, LMarker, LPolygon, LPopup } from "vue2-leaflet";

    import DonutChart from "./../common/charts/DonutChart";
    import BarChart from "./../common/charts/BarChart";
    import personal_data from "!json-loader!./personal.json";
    import table from "./components/table.vue";
    import detail from "./components/detail.vue";

    const DATE_FORMAT = "DD MMMM";

    export default {
        components: {
            LMap,
            LTileLayer,
            LPolygon,
            LMarker,
            LPopup,
            detail,
            lightingTable: table,
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
            personal: personal_data,
            polygon_color: "#ff00ff",
            polygon_color_active: "#ffff00"
        }),
        computed: {
            random_data() {
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
            }
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

   .donut-chart, .bar-chart {
      height: 100%;
   }
</style>

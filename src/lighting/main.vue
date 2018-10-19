<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column >
         <v-flex d-flex md6>
            <v-layout row wrap>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card>
                           <l-map :zoom="map.zoom" style="z-index: 5" :center="map.center">
                              <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
                              <template v-for="light in lights">
                                 <l-marker :lat-lng="light.coordinates" @click="map_marker_click" v-bind:key="light.name" :icon="get_marker_icon(light.selected)"></l-marker>
                              </template>
                           </l-map>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="blue lighten-3" dark>
                           <v-card-title primary class="title">{{$t("message.lighting_status")}}</v-card-title>
                           <v-card-text class="pt-0 chart">
                              <donut-chart class="donut-chart" :data="this.lights_chart_data"></donut-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md6>
            <v-layout row wrap>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                           <v-flex d-flex md12 class="table-block table-block-vm">
                              <lighting-table ref="lightingTable" @lighting_row_clicked="table_click" :data="lights"></lighting-table>
                           </v-flex>
                  </v-layout>

               </v-flex>
               <v-flex d-flex md6>
                  <v-layout row wrap>
                     <v-flex d-flex md12>
                        <v-card color="teal lighten-3" dark>
                           <v-card-title primary class="title">{{$t("message.lighting_efficiency")}}</v-card-title>
                           <v-card-text class="pt-0 chart">
                              <bar-chart class="bar-chart" :data="random_data" :fillParent="true"></bar-chart>
                           </v-card-text>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
      </v-layout>
      <detail ref="lightingTable"></detail>
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

    import DonutChart from "./../common/charts/DonutChartExtendedLegend";
    import BarChart from "./../common/charts/BarChartLine";
    import lighting_data from "!json-loader!./lighting.json";
    import table from "./components/table.vue";
    import detail from "./components/detail.vue";

    const DATE_FORMAT = "DD MMM";

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
            lights: lighting_data,
            polygon_color: "#ff00ff",
            polygon_color_active: "#ffff00"
        }),
        methods: {
            table_click(item) {
                console.log(item);
                this.lights.forEach(container => {
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
                this.$refs.lightingTable.show(item);
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
            },
            map_marker_click(event) {
                let light;
                for (let index = 0; index < this.lights.length; index++) {
                    this.lights[index].selected = false;
                    if (
                        event.latlng.lat == this.lights[index].coordinates.lat &&
                        event.latlng.lng == this.lights[index].coordinates.lng
                    ) {
                        light = this.lights[index];
                        this.$refs.lightingTable.show(light);
                        light.selected = true;
                        this.map.center.lat = light.coordinates.lat;
                        this.map.center.lng = light.coordinates.lng;
                    }
                }

            },
            table_click(item) {
                this.lights.forEach(light => {
                    light.selected = false;
                });
                item.selected = true;
                this.map.center = L.latLng(
                    item.coordinates.lat,
                    item.coordinates.lng
                );
                this.map.zoom = 17;
            },

        },
        computed: {
            random_data() {
                return [
                    {
                        title: moment()
                            .subtract(6, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 30 + 30)
                    },
                    {
                        title: moment()
                            .subtract(5, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 30 + 30)
                    },
                    {
                        title: moment()
                            .subtract(4, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 30 + 30)
                    },
                    {
                        title: moment()
                            .subtract(3, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 30 + 30)
                    },
                    {
                        title: moment()
                            .subtract(2, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 30 + 30)
                    },
                    {
                        title: moment()
                            .subtract(1, "days")
                            .format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 40 + 20)
                    },
                    {
                        title: moment().format(DATE_FORMAT),
                        value: Math.ceil(Math.random() * 40 + 20)
                    }
                ];
            },
            lights_chart_data() {

                let total_lights = this.lights.length;

                let active_lights = this.lights.filter(function (data) {
                    return data.status === "active"
                }).length;
                let inactive_lights = this.lights.filter(function (data) {
                    return data.status === "inactive"
                }).length;
                let failure_lights = this.lights.filter(function (data) {
                    return data.status === "failure"
                }).length;

                return [
                    {
                        title: this.$i18n.t("message.active_lights") + " " + (active_lights / total_lights * 100) + "%" + " (" + active_lights + " " + this.$i18n.t("message.pieces_short") + ")",
                        value: active_lights,
                        color: "#039BE5"
                    },
                    {
                        title: this.$i18n.t("message.inactive_lights") + " " + (inactive_lights / total_lights * 100) + "%" + " (" + inactive_lights + " " + this.$i18n.t("message.pieces_short") + ")",
                        value: inactive_lights,
                        color: "#8D6E63"
                    },
                    {
                        title: this.$i18n.t("message.failure_lights") + " " + (failure_lights / total_lights * 100) + "%" + " (" + failure_lights + " " + this.$i18n.t("message.pieces_short") + ")",
                        value: failure_lights,
                        color: "#FFF"
                    }
                ];
            },
        }
    };
</script>

import Vue from 'vue'
import main_page from './main_page.vue'
import dashboard from './dashboard.vue'

import eco_monitoring_map from './eco_monitoring/map.vue'
import eco_monitoring_stations from './eco_monitoring/stations.vue'
import eco_monitoring_history from './eco_monitoring/history.vue'
import eco_monitoring_aqi from './eco_monitoring/aqi.vue'
import eco_monitoring_sityair from './eco_monitoring/sityair.vue'

import parking_map from './parking/map.vue'
import parking_partner from './parking/partner.vue'
import parking_stat from './parking/stat.vue'

import lighting_main from './lighting/main.vue'
import lighting_unilight from './lighting/unilight.vue'

import safety_acs_lora from './safety/acs-lora.vue'
import safety_video_monitoring from './safety/video-monitoring.vue'
import safety_video_analitics from './safety/video-analitics.vue'

import metering_gascloud from './metering/gascloud.vue'
import metering_linergo from './metering/linergo.vue'
import metering_meters from './metering/meters.vue'
import metering_company from './metering/company.vue'
import metering_personal from './metering/personal.vue'


import infras_incidents from './infrastructure/incidents.vue'
import infras_stat from './infrastructure/energy_management.vue'
import infras_monitoring from './infrastructure/monitoring.vue'
import infras_managment from './infrastructure/managment.vue'
import infras_gateways from './infrastructure/gateways.vue'

import waste_containers from './waste/containers.vue'
import waste_planning from './waste/planning.vue'
import waste_managment from './waste/managment.vue'
import waste_stat from './waste/stat.vue'

let color_nokia = {
   blue: "#124191",
   gray_1: "#EDF3F5",
   gray_2: "#BEC8D2",
   gray_3: "#98A2AE",
   gray_4: "#4D5766",
   gray_5: "#273142",
   light_blue: "#00C9FF",
   red: "#FF3154",
   yellow: "#FFFB00",
   green: "#4BDD33",
   orange: "#FF9910",
   grafana_grey: "#F6F7F9"
}

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify, {
   theme: {
      nokia_blue: color_nokia.blue,
      nokia_gray_1: color_nokia.gray_1,
      nokia_gray_2: color_nokia.gray_2,
      nokia_gray_3: color_nokia.gray_3,
      nokia_gray_4: color_nokia.gray_4,
      nokia_gray_5: color_nokia.gray_5,
      nokia_light_blue: color_nokia.light_blue,
      nokia_red: color_nokia.red,
      nokia_yellow: color_nokia.yellow,
      nokia_green: color_nokia.green,
      nokia_orange: color_nokia.orange,

      primary: color_nokia.blue,
      secondary: color_nokia.light_blue,
      accent: color_nokia.yellow,
      error: color_nokia.red,
      warning: color_nokia.yellow,
      info: color_nokia.gray_2,
      success: color_nokia.green,
      grafana_grey: color_nokia.grafana_grey,
   }
})

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(solid.faDatabase)
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const router = new VueRouter({
   routes: [{
      path: '/dashboard',
      component: dashboard
   }, {
      path: '/eco_monitoring/map',
      component: eco_monitoring_map
   }, {
      path: '/eco_monitoring/stations',
      component: eco_monitoring_stations
   }, {
      path: '/eco_monitoring/history',
      component: eco_monitoring_history
   }, {
      path: '/eco_monitoring/aqi',
      component: eco_monitoring_aqi
   },
   {
      path: '/eco_monitoring/aqi1',
      component: eco_monitoring_aqi
   },
   {
      path: '/eco_monitoring/sityair',
      component: eco_monitoring_sityair
   },
   {
      path: '/eco_monitoring/sityair1',
      component: eco_monitoring_sityair
   },
   {
      path: '/parking/map',
      component: parking_map
   },
   {
      path: '/parking/partner1',
      component: parking_partner
   },
   {
      path: '/parking/partner2',
      component: parking_partner
   },
   {
      path: '/parking/partner3',
      component: parking_partner
   },
   {
      path: '/parking/stat',
      component: parking_stat
   }, {
      path: '/lighting/main',
      component: lighting_main
   },
   {
      path: '/lighting/unilight',
      component: lighting_unilight
   },
   {
      path: '/lighting/unilight1',
      component: lighting_unilight
   },
   {
      path: '/lighting/unilight2',
      component: lighting_unilight
   },
   {
      path: '/lighting/unilight3',
      component: lighting_unilight
   },
   {
      path: '/safety/acs_lora',
      component: safety_acs_lora
   }, {
      path: '/safety/video-monitoring',
      component: safety_video_monitoring
   }, {
      path: '/safety/video-analitics',
      component: safety_video_analitics
   }, {
      path: '/metering/gascloud',
      component: metering_gascloud
   }, {
      path: '/metering/linergo',
      component: metering_linergo
   },
   {
      path: '/metering/linergo1',
      component: metering_linergo
   },
   {
      path: '/metering/meters',
      component: metering_meters
   }, {
      path: '/metering/company',
      component: metering_company
   }, {
      path: '/metering/personal',
      component: metering_personal
   }, {
      path: '/infrastructure/incidents',
      component: infras_incidents
   }, {
      path: '/lighting/energy_management',
      component: infras_stat
   }, {
      path: '/infrastructure/monitoring',
      component: infras_monitoring
   }, {
      path: '/infrastructure/gateways',
      component: infras_gateways
   }, {
      path: '/infrastructure/managment',
      component: infras_managment
   }, {
      path: '/waste/containers',
      component: waste_containers
   }, {
      path: '/waste/planning',
      component: waste_planning
   }, {
      path: '/waste/stat',
      component: waste_stat
   },
   {
      path: '/waste/managment',
      component: waste_managment
   },
   {
      path: '/waste/managment1',
      component: waste_managment
   },
   {
      path: '/waste/managment2',
      component: waste_managment
   },
   {
      path: '/waste/managment3',
      component: waste_managment
   },
   {
      path: '*',
      redirect: '/dashboard'
   }]
});

import Axios from "axios";
import VueAxios from "vue-axios";
import Vuex from 'vuex';
import Vue_i18n from 'vue-i18n';
Vue.use(Vuex, VueAxios, Axios, Vue_i18n);

const store = new Vuex.Store({
    state: {
        locale: "ru",
        waste_markers: [],
        waste_filling_levels_chart: {
            dim: "name",
            height: "150",
            width: "150",
            color: "nokia_gray_2",
            selector: "#waste_filling_levels_chart",
            metric: "value",
            data: {}
        },
        waste_batteries_levels_chart: {
            dim: "name",
            height: "150",
            width: "150",
            selector: "#batteries_levels_chart",
            metric: "value",
            data: {}
        },
        waste_online_containers : 0
    },
    mutations: {
        updateWasteMarkers(state, items) {
            Object.keys(items).forEach(function(key){
                let item_type = key;
                let item_id = Object.keys(items[key])[0];
                if (state.waste_markers.filter(marker => marker.id === item_id).length === 0) {
                    state.waste_markers.push({
                        id: item_id,
                        name: item_type +" - "+ item_id,
                        vendor: "CleanCity",
                        coordinates: {
                            lat: items[key][item_id].latitude.value,
                            lng: items[key][item_id].longitude.value,
                        },
                        draggable:true,
                        visible:true,
                        selected:false,
                        tooltip: "Waste container "+item_type,
                        level: items[key][item_id].current_fill_level.value,
                        battery: items[key][item_id].battery_health.value,
                        status: "online",
                        type: "waste"
                    });
                } else {
                    state.waste_markers.forEach(function(marker){
                        if (marker.id === item_id) {
                            marker.coordinates.lat = items[key][item_id].latitude.value;
                            marker.coordinates.lng = items[key][item_id].longitude.value;
                            marker.level = items[key][item_id].current_fill_level.value;
                            marker.battery = items[key][item_id].battery_health.value;
                        }
                    })
                }
            });
            store.commit("updateWasteLevelsFillingChart");
            store.commit("updateBatteryLevels");
        },
        updateWasteLevelsFillingChart(state) {
                let count_20 = 0;
                let count_80 = 0;
                let count_100 = 0;
                for (let index = 0; index < state.waste_markers.length; index++) {
                    if (state.waste_markers[index].level < 20) count_20++;
                    else if (state.waste_markers[index].level <= 80) count_80++;
                    else if (state.waste_markers[index].level > 80) count_100++;
                }
                state.waste_filling_levels_chart.data =  [
                    { title: "<20%", value: count_20, color: "#039BE5" },
                    { title: "<80%", value: count_80, color: "#8D6E63" },
                    { title: ">80%", value: count_100, color: "#D4E157" }
                ];
        },
        updateBatteryLevels(state) {
            let count_20 = 0;
            let count_80 = 0;
            let count_100 = 0;
            for (let index = 0; index < state.waste_markers.length; index++) {
                if (state.waste_markers[index].battery < 20) count_20++;
                else if (state.waste_markers[index].battery <= 80) count_80++;
                else if (state.waste_markers[index].battery > 80) count_100++;
            }
            state.waste_batteries_levels_chart.data = [
                { title: "<20%", value: count_20, color: "#039BE5" },
                { title: "<80%", value: count_80, color: "#8D6E63" },
                { title: ">80%", value: count_100, color: "#D4E157" }
            ];
        },
        updateLocale(state, locale) {
            this.state.locale = locale;
        }
    },
    getters: {
        getWasteMarkers: state => {
            return state.waste_markers;
        },
        getWasteLevelsFillingChart: state => {
            return state.waste_filling_levels_chart;
        },
        getBatteriesLevelsChart: state => {
            return state.waste_batteries_levels_chart;
        },
        getLocale: state => {
            return state.locale;
        }
    },
    actions: {
        getWasteData: ({ commit }) => {
            Axios.get(
                "https://sk.iot.nokia.com/we/cleancity_simulated"
            )
                .then(response => {
                    commit("updateWasteMarkers", response.data.cleancity)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        changeLocale: ({ commit }, locale) => {
            commit("updateLocale", locale)
        }
    }
});

import L from 'leaflet'
import "../node_modules/leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png')
})

const messages = require ('./assets/translation.json');
const i18n = new Vue_i18n({
    locale: store.state.locale,
    messages,
})

import "../src/assets/global.css";

new Vue({
   el: '#app',
   router,
   store,
   i18n,
   render: h => h(main_page)
})

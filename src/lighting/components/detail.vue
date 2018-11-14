<template>
   <div>
      <v-dialog v-model="visible" max-width="450px" overlay-hide style="z-index: 1">
         <v-card>
            <v-card-title>
               <div class="title text-xs-center">{{values.name}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <div v-if="values.status === 'active'" class="subheading">{{$t("message.status")}}: {{$t("message.lamp_on")}}</div>
               <div v-if="values.status === 'inactive'" class="subheading">{{$t("message.status")}}: {{$t("message.lamp_off")}}</div>
               <div v-if="values.status === 'failure'" class="subheading">{{$t("message.status")}}: {{$t("message.lamp_faliure")}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.light_uptime")}}: {{values.uptime}} {{$t("message.short_hours")}}</div>
               <v-progress-linear :value="this.get_progress(values)" height="20" color="secondary"></v-progress-linear>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.next_service_due")}}: {{values.service_time}} {{$t("message.short_hours")}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.current_consumption")}}: {{values.brightness}} {{$t("message.watt")}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.temperature")}}: {{values.temperature}} °C</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div v-if="!values.device_id" class="subheading">{{$t("message.brightness")}}: {{values.brightness}} %</div>
               <v-slider class="brightness-slider" v-if="values.device_id && values.status === 'active'"
                         @change="change_brightness(values)" v-model="values.brightness" thumb-label
                         :label="$t('message.brightness')">
               </v-slider>
               <v-slider class="brightness-slider"
                         v-if="values.device_id && values.status === 'inactive' || values.status === 'changing'"
                         readonly v-model="values.brightness" :label="$t('message.brightness')">
               </v-slider>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <div class="subheading">{{$t("message.coordinates")}}: {{values.coordinates.lat}}, {{values.coordinates.lng}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions v-if="!values.device_id"  class="d-block text-xs-center">
               <!-- <v-btn color="primary " flat @click.stop="visible=false">{{$t("message.close")}}</v-btn> -->
               <v-btn color="primary " v-show="values.status === 'inactive'" @click="values.status = 'active'">{{$t("message.on")}}</v-btn>
               <v-btn color="primary " v-show="values.status === 'active'" @click="values.status = 'inactive'">{{$t("message.off")}}</v-btn>
            </v-card-actions>
            <v-card-actions v-if="values.device_id"  class="d-block text-xs-center">
               <v-btn color="primary " v-show="values.status === 'inactive'" @click="unilight_toggle(values)">{{$t("message.on")}}</v-btn>
               <v-btn color="primary " v-show="values.status === 'active'" @click="unilight_toggle(values)">{{$t("message.off")}}</v-btn>
               <v-btn color="primary " v-show="values.status === 'changing'"><i class="fa fa-spinner fa-spin"></i></v-btn>
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

import BarChart from "./../../common/charts/BarChart";

export default {
  components: {
    BarChart
  },
  data: () => ({
    visible: false,
    values: {
        coordinates: {}
    }
  }),
  methods: {
    show(item) {
      this.values = item;
      this.visible = true;
    },
    get_progress(values) {
      return (values.uptime / 5000) * 100
    },
    unilight_toggle(device) {
          let target_dim_percent = 0;
          if(device.status === "active") {
              target_dim_percent = 0;
          }
          else {
              target_dim_percent = 50;
          }
          device.status = "changing";
          Vue.axios
              .get("https://sk.iot.nokia.com/we/unilight_dim_light", {
                  params: {
                      set_dim: target_dim_percent,
                      device_id: device.device_id
                  }
              })
              .then(response => {
                  setTimeout(() => this.$emit("unilight_change"), 5000);
              })
              .catch(error => {
                  console.log(error);
              })
    },
    change_brightness(device) {
        Vue.axios
            .get("https://sk.iot.nokia.com/we/unilight_dim_light", {
                params: {
                    set_dim: device.brightness,
                    device_id: device.device_id
                }
            })
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            })
    }
  }
};
</script>
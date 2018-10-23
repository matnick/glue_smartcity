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
               <div class="subheading">{{$t("message.current_consumption")}}: {{values.consumption}} {{$t("message.watt")}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.temperature")}}: {{values.temperature}} °C</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.brightness")}}: {{values.brightness}} %</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <div class="subheading">{{$t("message.coordinates")}}: {{values.coordinates.lat}}, {{values.coordinates.lng}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions  class="d-block text-xs-center">
               <!-- <v-btn color="primary " flat @click.stop="visible=false">{{$t("message.close")}}</v-btn> -->
               <v-btn color="primary " v-show="values.status === 'inactive'" @click="values.status = 'active'">{{$t("message.on")}}</v-btn>
               <v-btn color="primary " v-show="values.status === 'active'" @click="values.status = 'inactive'">{{$t("message.off")}}</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
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
    }
  }
};
</script>
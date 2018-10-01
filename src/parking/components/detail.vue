<template>
   <div>
      <v-dialog v-model="visible" max-width="450px" overlay-hide style="z-index: 1">
         <v-card>
            <v-card-title>
               <div class="title text-xs-center">{{values.name}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.free")}}: {{Math.round(values.free / values.places * 100)}}%</div>
               <v-progress-linear :value="this.get_progress(values)" height="20" color="secondary"></v-progress-linear>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="chart">
              <div class="subheading">{{$t("message.parking_stats")}}</div>
              <bar-chart :data="this.get_random_data()"></bar-chart>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <div class="subheading">{{$t("message.address")}}: {{values.address}}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
               <v-btn color="primary " flat @click.stop="visible=false">{{$t("message.close")}}</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import 'moment/locale/ru';


import BarChart from "./../../common/charts/BarChart";

const DATE_FORMAT = 'DD MMMM'

export default {
  components: {
    BarChart
  },
  data: () => ({
    visible: false,
    values: {}
  }),
  methods: {
    show(item) {
      this.values = item;
      this.visible = true;
    },
    get_progress(values) {
      return (values.free / values.places) * 100
    },
    get_random_data() {
      return [
        {
          title: moment().subtract(6, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().subtract(5, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().subtract(4, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().subtract(3, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().subtract(2, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().subtract(1, 'days').format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
        {
          title: moment().format(DATE_FORMAT),
          value: Math.ceil(Math.random() * 100)
        },
      ];
    },
  }
};
</script>


<style scoped>
.chart {
  height: calc(100% - 56px);
  min-height: 320px;
}
</style>
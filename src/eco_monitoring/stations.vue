<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="white">
               <v-data-table :headers="headers" :items="station_table" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">

                     <tr @click="$router.push({path: '/eco_monitoring/history'})">
                        <td>
                           <div>{{ props.item.name }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.aqi }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.type }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.status }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.lat }}, {{ props.item.lng }}</div>
                        </td>
                     </tr>
                  </template>
               </v-data-table>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>


<script>
import Vue from "vue";
import Vue_i18n from 'vue-i18n';
import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(Vue_i18n, VueAxios, Axios);

export default {
  mounted: function() {
    this.download_data();
  },
  methods: {
    download_data() {
      Vue.axios
        .get("/we/weather_stations")
        .then(response => {
          this.station_table = this.convert_backend_data(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    convert_backend_data(data) {
      let arr = [];

      Object.keys(data).forEach(item => {
        const element = data[item];
        let station = {};

        Object.keys(element).forEach(item => {
          if (element[item] && element[item].value !== undefined) {
            station[item] = element[item].value;
          }
        });

        arr.push(station);
      });

      return arr;
    }
  },
  data: () => ({
    pagination: { rowsPerPage: 25 },

    station_table: []
  }),
  computed: {
      headers () {
          return [
              {
                  text: this.$i18n.t("message.name"),
                  value: "name",
                  align: "left"
              },
              {
                  text: this.$i18n.t("message.aqi"),
                  value: "aqi",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.type"),
                  value: "type",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.stations"),
                  value: "status",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.coordinates"),
                  value: "lat",
                  align: "center"
              }
          ]
      }
  }
};
</script>




<style>
.fill-height {
  height: 100%;
}

.text-center {
  text-align: center;
}
</style>


<style scoped>
</style>

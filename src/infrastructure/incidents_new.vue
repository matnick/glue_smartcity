<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="white">
               <v-data-table :headers="headers" :items="table" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">
                     <tr class="clickable_row" @click="$router.push(props.item.link)">
                        <td>
                           <div>{{ props.item.system }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.status }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.incidents }}</div>
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
Vue.use(Vue_i18n);

export default {
  data: () => ({
    pagination: { rowsPerPage: 25 }
  }),
  computed: {
      table() {
          return [
              {
                  "system": this.$i18n.t("message.waste_monitoring"),
                  "status": "нормальный",
                  "link": "/waste/containers",
                  "incidents": 1
              },
              {
                  "system": this.$i18n.t("message.parking"),
                  "status": "нормальный",
                  "link": "/parking/map",
                  "incidents": 0
              },
              {
                  "system": this.$i18n.t("message.lighting"),
                  "status": "нормальный",
                  "link": "/lighting/main",
                  "incidents": 0
              },
              {
                  "system": this.$i18n.t("message.metering_monitoring"),
                  "status": "нормальный",
                  "link": "/metering/company",
                  "incidents": 2
              },
              {
                  "system": this.$i18n.t("message.air_and_weather"),
                  "status": "нормальный",
                  "link": "/eco_monitoring/map",
                  "incidents": 0
              },
              {
                  "system": this.$i18n.t("message.ecological_monitoring"),
                  "status": "нормальный",
                  "link": "/eco_monitoring/stations",
                  "incidents": 0
              },
              {
                  "system": this.$i18n.t("message.safety"),
                  "status": "нормальный",
                  "link": "/safety/video-monitoring",
                  "incidents": 0
              },
              {
                  "system": this.$i18n.t("message.transport"),
                  "status": "нормальный",
                  "link": "/parking/map",
                  "incidents": 0
              }
          ]
      },
      headers () {
          return [
              {
                  text: this.$i18n.t("message.system"),
                  value: "system",
                  align: "left"
              },
              {
                  text: this.$i18n.t("message.status"),
                  value: "status",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.incidents"),
                  value: "incidents",
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
.clickable_row {
   cursor:pointer;
}
</style>


<style scoped>
</style>

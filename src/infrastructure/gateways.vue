<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="white">
               <v-data-table :headers="headers" :items="table" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">
                     <tr>
                        <td>
                           <div>{{ props.item.name }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.devices }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.type }}</div>
                        </td>
                        <td class="text-center">
                           <div>{{ props.item.status }}</div>
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

import tableData from "!json-loader!./gateways.json";

export default {
  data: () => ({
    pagination: { rowsPerPage: 25 },
    table: tableData,
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
                  text: this.$i18n.t("message.connected_devices"),
                  value: "devices",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.type"),
                  value: "type",
                  align: "center"
              },
              {
                  text: this.$i18n.t("message.status"),
                  value: "status",
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

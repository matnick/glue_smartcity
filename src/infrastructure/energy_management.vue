<template>
   <v-container fill-height fluid>
      <v-layout row wrap>
         <v-flex d-flex md12>
            <v-card color="white">
               <v-card-title class="py-1 px-1">

                  <v-btn color="primary" @click.native="on">
                     <v-icon left small>fa-plug</v-icon> ON ALL
                  </v-btn>
                  <v-btn color="primary" @click.native="off">
                     <v-icon left small>fa-power-off</v-icon> OFF ALL
                  </v-btn>
               </v-card-title>

               <v-divider></v-divider>
               <v-data-table :headers="headers" :items="station_table" :pagination.sync="pagination">
                  <template slot="items" slot-scope="props">

                     <tr @click="$refs.energy_management_details.show(props.item)">
                        <td>
                           <div>{{ props.item.name }}</div>
                        </td>
                        <td>
                           <div>{{ props.item.address }}</div>
                        </td>
                        <td>
                           <div>{{ props.item.type }}</div>
                        </td>
                        <td>
                           <div>{{ props.item.status }}</div>
                        </td>
                     </tr>
                  </template>
               </v-data-table>
            </v-card>
         </v-flex>
      </v-layout>
      <energy_management_details ref="energy_management_details"></energy_management_details>

   </v-container>
</template>


<script>
import Vue from "vue";
import tableData from "!json-loader!./stations.json";

import energy_management_details from "./components/energy_management_details.vue";
Vue.component("energy_management_details", energy_management_details);

export default {
  data: () => ({
    pagination: { rowsPerPage: 25 },

    station_table: tableData,
    headers: [
      {
        text: "Name",
        value: "name",
        align: "left"
      },
      {
        text: "Address",
        value: "address",
        sortable: false
      },
      {
        text: "Type",
        value: "type",
        align: "center"
      },
      {
        text: "Status",
        value: "status",
        sortable: false
      }
    ]
  }),
  methods: {
    on() {
      Vue.axios
        .get("http://localhost:8080/system_actions", {
          params: {
            action: this[l].action
          }
        })
        .then(response => {})
        .catch(error => {});
    },
    off() {}
  }
};
</script>

<style scoped>
</style>

<template>
   <div>
      <detail ref="parkingTable"></detail>
      <v-layout fix-layout column class="table-column">
         <v-flex d-inline-flex class="flex-full-height">
            <v-card class="no-shadow">
               <v-data-table :headers="table_headers" :items="data" :pagination.sync="pagination" hide-actions class="elevation-1">
                  <template slot="headers" slot-scope="props">
                     <tr class="text-center">
                        <th v-for="header in props.headers" :key="header.text">
                           {{ header.text }}
                        </th>
                     </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                     <tr :class="props.item.selected ? 'row-selected text-center' : 'text-center'">
                        <td @click="center_map(props.item)">{{ props.item.name }}</td>
                        <td @click="center_map(props.item)">{{ props.item.free }}</td>
                        <td @click="center_map(props.item)">{{ props.item.places }}</td>
                        <td class="button-sm">
                           <v-btn icon class="ml-0 mr-2" @click="show_details(props.item)">
                              <v-icon color="grey" small>fa-eye</v-icon>
                           </v-btn>
                        </td>
                        <td @click="center_map(props.item)">{{ props.item.sensor_type }}</td>
                     </tr>
                  </template>
               </v-data-table>
            </v-card>
         </v-flex>
         <v-flex v-if="pagination.totalItems > pagination.rowsPerPage" d-block>
            <v-card class="no-shadow pagination-block">
               <v-pagination class="custom-pagination" v-model="pagination.page" :length="pages"></v-pagination>
            </v-card>
         </v-flex>
      </v-layout>
   </div>
</template>

<script>
import Vue from "vue";
import detail from "./detail.vue";
import Vue_i18n from 'vue-i18n';
Vue.use(Vue_i18n);

export default {
  components: {
    detail
  },
  data: () => ({
    pagination: { rowsPerPage: 12 }
  }),
  props: ["data"],
  computed: {
    pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
        return 0;
      }

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    },
    table_headers () {
        return [
            { text: this.$i18n.t("message.name"), value: "name" },
            { text: this.$i18n.t("message.free"), value: "free" },
            { text: this.$i18n.t("message.places"), value: "places" },
            { text: this.$i18n.t("message.info"), value: "info" },
            { text: this.$i18n.t("message.sensor_type"), value: "sensor_type" },
        ]
    }
  },
  methods: {
    show_details(item) {
      this.$refs.parkingTable.show(item);
    },
    center_map(item) {
      this.$emit("parking_row_clicked", item);
    }
  }
};
</script>


<style>
.no-shadow {
  box-shadow: none;
}

table.table tbody td,
table.table tbody th {
  height: 25px !important;
}

.flex-full-height {
  height: 100%;
  padding: 0px !important;
}

.text-center {
  text-align: center;
}

.pagination-block {
   display: flex;
   justify-content: center;
}
</style>



<style scoped>
.row-selected {
  background-color: rgb(155, 204, 255);
}

table.table thead tr {
  height: 30px;
}

.small_title {
  height: 30px;
}

.button-sm {
  margin: -11px !important;
}

.button-sm button {
  height: 16px;
  width: 16px;
  margin: 0 !important;
}

.table-column {
  height: 100% !important;
}
</style>


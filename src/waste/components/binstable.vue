<template>
   <div>
      <bindetails ref="bindetails"></bindetails>
      <v-layout column class="table-block-mt">
         <v-flex d-inline-flex class="flex-full-height">
            <v-card class="no-shadow">
               <v-data-table :headers="table_headers" :items="smartbins" :pagination.sync="pagination" hide-actions class="elevation-1">
                  <template slot="headers" slot-scope="props">
                     <tr class="text-center">
                        <th v-for="header in props.headers" :key="header.text" :width="header.width">
                           {{ header.text }}
                        </th>
                     </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                     <tr :class="props.item.selected ? 'row-selected text-center' : 'text-center'">
                        <td @click="center_map(props.item)" :title="props.item.name">{{ props.item.name }}</td>
                        <td @click="center_map(props.item)">{{ props.item.level }} %</td>
                        <td @click="center_map(props.item)">{{ props.item.status }}</td>
                        <td @click="center_map(props.item)" :title="props.item.vendor">{{ props.item.vendor }}</td>

                        <td class="button-sm">
                           <v-btn icon class="ml-0 mr-2" @click="showbindetails(props.item)">
                              <v-icon color="grey" small>fa-eye</v-icon>
                           </v-btn>
                        </td>
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
import Vue_i18n from 'vue-i18n';
Vue.use(Vue_i18n);

import bindetails from "./bindetails.vue";
Vue.component("bindetails", bindetails);

export default {
  data: () => ({
    smartbins: [],
    pagination: { rowsPerPage: 14 },
  }),
  props: ["bins"],
  computed: {
    table_headers () {
      return [
            { text: this.$i18n.t("message.name"), value: "name", width:"30%" },
            { text: this.$i18n.t("message.level"), value: "level", width:"15%" },
            { text: this.$i18n.t("message.status"), value: "status", width:"15%"  },
            { text: this.$i18n.t("message.vendor"), value: "vendor", width:"20%"  },
            { text: this.$i18n.t("message.info"), value: "info", width:"15%"  }
        ]
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  mounted: function() {
    this.smartbins = this.$props.bins;
  },
  methods: {
    showbindetails(item) {
      this.$refs.bindetails.show(item);
    },
    center_map(item) {
      this.$emit("row_clicked", item);
    }
  }
};
</script>

<style scoped>
.table-block-mt {
   margin-top: 4px !important;
}
.row-selected {
  background-color: rgb(155, 204, 255);
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

thead tr {
   height: 25px !important;
}

.table-column >>> tbody tr {
   height: 50px;
   cursor:pointer;
}
</style>


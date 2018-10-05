<template>
   <div>
      <v-layout fix-layout column class="table-column">
         <v-flex d-inline-flex class="flex-full-height">
            <v-card class="no-shadow">
               <v-data-table :headers="table_headers" :items="table_entries" :pagination.sync="pagination" hide-actions class="elevation-1">
                  <template slot="headers" slot-scope="props">
                     <tr class="text-center">
                        <th v-for="header in props.headers" :key="header.text">
                           {{ header.text }}
                        </th>
                     </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                     <tr :class="props.item.selected ? 'row-selected text-left' : 'text-left'">
                        <td @click="center_map(props.item)">{{ props.item.house_number }}</td>
                        <td @click="center_map(props.item)">{{ props.item.street_name }}</td>
                        <td class="button-sm text-center">
                           <v-btn icon class="ml-0 mr-2" @click="show_house_info(props.item)">
                              <v-icon color="indigo" small>fa-info</v-icon>
                           </v-btn>
                        </td>
                        <td class="button-sm text-center">
                           <v-btn icon class="ml-0 mr-2" @click="show_house_alert(props.item)" v-if="Object.keys(props.item.announcements).length !== 0">
                              <v-icon color="red" small>fa-exclamation</v-icon>
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
      <detail ref="housesTable"></detail>
      <alert ref="alertTable"></alert>
   </div>
</template>

<script>
    import Vue from "vue";
    import detail from "./detail.vue";
    import alert from "./alert.vue";
    import Vue_i18n from 'vue-i18n';
    Vue.use(Vue_i18n);

    export default {
        components: {
            detail,
            alert
        },
        data: () => ({
            pagination: { rowsPerPage: 2 }
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
                    { text: this.$i18n.t("message.house_number"), value: "house_number" },
                    { text: this.$i18n.t("message.street_name"), value: "street_name" },
                    { text: this.$i18n.t("message.information"), value: "information" },
                    { text: this.$i18n.t("message.notifications"), value: "notifications" },
                ]
            },
            table_entries() {
                return this.data.filter(function(data){ return data.status_description !== "" });
            }
        },
        methods: {
            center_map(item) {
                this.$emit("house_row_clicked", item);
            },
            show_house_info(item) {
                this.$refs.housesTable.show(item);
            },
            show_house_alert(item) {
                this.$refs.alertTable.show(item);
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
   table.table thead tr {
      height: 30px;
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


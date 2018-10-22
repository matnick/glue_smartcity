<template>
   <div>
      <v-layout column class="table-column">
         <v-flex d-inline-flex class="flex-full-height table-container">
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
                     <tr @click="center_map(props.item)" :class="props.item.selected ? 'row-selected text-left' : 'text-left'">
                        <td>{{ props.item.house_number }}</td>
                        <td>{{ props.item.street_name }}</td>
                        <td class="button-sm text-center">
                           <v-btn icon class="info-button ml-0 mr-2" @click.stop="show_house_info(props.item)">
                              <v-icon color="indigo" small>fa-info</v-icon>
                           </v-btn>
                        </td>
                        <td class="button-sm text-center">
                           <v-btn icon class="warn-button ml-0 mr-2" @click.stop="show_house_alert(props.item)" v-if="Object.keys(props.item.announcements).length !== 0">
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
            pagination: { rowsPerPage: 7 }
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
<style scoped>
   thead tr {
      height: 25px !important;
   }

   .table-container >>> tbody tr {
      height: 33px !important;
      cursor: pointer;
   }

   .table-container {
      box-shadow: none !important;
   }

   .elevation-1 {
      overflow-y:auto;
   }

   .button-sm button {
      height: 16px;
      width: 16px;
      margin: 0 !important;
   }

   .pagination-block >>> .v-pagination__item, .pagination-block >>> .v-pagination__navigation {
      height: 20px;
      width:20px;
      font-size:12px;
      outline:none;
   }

   .pagination-block >>> .v-icon {
      font-size: 12px;
   }
</style>


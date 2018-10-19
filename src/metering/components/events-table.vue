<template>
   <div>
      <v-layout column class="table-column">
         <v-flex d-inline-flex class="flex-full-height">
            <v-card v-if="data.length > 0" class="no-shadow">
               <v-data-table :headers="table_headers" :items="data" :pagination.sync="pagination" hide-actions class="elevation-1">
                  <template slot="headers" slot-scope="props">
                     <tr class="text-center">
                        <th v-for="header in props.headers" :key="header.text">
                           {{header.text}}
                        </th>
                     </tr>
                  </template>
                  <template slot="items" slot-scope="props">
                     <tr>
                        <td>{{props.item}}</td>
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

    export default {
        data: () => ({
            pagination: { rowsPerPage: 4 }
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
                    { text: this.$i18n.t("message.events"), value: "events" },
                ]
            }
        },
    };
</script>
<style scoped>
   thead tr {
      height: 25px !important;
   }

   .table-column {
      height: 100% !important;
   }
</style>


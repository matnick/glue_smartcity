<template>
   <div>
      <v-layout column class="table-column">
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
                        <td @click="center_map(props.item)">{{ props.item.name }}: {{ props.item.status_description }}</td>
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
            pagination: { rowsPerPage: 6 }
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
            },
            table_entries() {
                return this.data.filter(function(data){ return data.status_description !== "" });
            }
        },
        methods: {
            show_details(item) {
                this.$refs.parkingTable.show(item);
            },
            center_map(item) {
                this.$emit("lighting_row_clicked", item);
            }
        }
    };
</script>

<style scoped>
   thead tr {
      height: 25px !important;
   }

   .table-column >>> tbody tr {
      height: 50px;
      cursor:pointer;
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


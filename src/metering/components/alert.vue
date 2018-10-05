<template>
   <div>
      <v-dialog v-model="visible" max-width="450px" overlay-hide style="z-index: 1">
         <v-card>
            <v-card-title>
               <div class="title text-xs-center">{{values.announcements.header}}</div>
            </v-card-title>

            <v-card-text>
               <div class="subheading">{{values.announcements.message}}</div>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">{{$t("message.concierge_phone")}}: {{values.information.concierge_phone}}</div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions  class="d-block text-xs-center">
               <v-btn color="primary " flat @click.stop="visible=false">{{$t("message.close")}}</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
    import BarChart from "./../../common/charts/BarChart";

    export default {
        components: {
            BarChart
        },
        data: () => ({
            visible: false,
            values: {
                coordinates: {},
                information: {},
                announcements: {}
            }
        }),
        methods: {
            show(item) {
                this.values = item;
                this.visible = true;
            },
            get_progress(values) {
                return (values.uptime / 5000) * 100
            }
        }
    };
</script>
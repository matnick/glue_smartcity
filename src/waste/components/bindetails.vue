<template>
   <div>
      <v-dialog v-model="visible" max-width="300px" overlay-hide style="z-index: 1">
         <v-card>
            <v-card-title>
               <div class="title text-xs-center">{{values.name}}: {{values.status}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">Utilization level: {{values.level}}%</div>
               <v-progress-linear v-model="values.level" height="20" color="secondary"></v-progress-linear>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading">Battery level: {{values.battery}}%</div>
               <v-progress-linear v-model="values.battery" height="20" color="secondary"></v-progress-linear>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
               <div class="subheading ">Location: {{values.coordinates.lat}}, {{values.coordinates.lng}}</div>
            </v-card-text>
            <v-card-actions>
               <v-btn color="primary " flat @click.stop="visible=false">Close</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </div>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    visible: false,
    values: {
        name : '',
        status: '',
        level: '',
        battery: '',
        coordinates: {
            lat : '',
            lng : ''
        },
    }
  }),
  methods: {
    show(item) {
      this.values = item;
      this.visible = true;
    }
  }
};
</script>

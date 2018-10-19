<template>
   <v-container fill-height fluid>
      <iframe :src="src" class="iframe-size"></iframe>
   </v-container>
</template>


<script>
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, Axios);

export default {
  data: () => ({
    src: "https://ng.unilight.su/"
  })
};
</script>

<style scoped>
</style>

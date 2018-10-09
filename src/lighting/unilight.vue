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
    src: "http://ng.unilight.su/"
  })
};
</script>


<style>
.fill-height {
  height: 100%;
  padding: 0px;
  padding-top: 2px;
}

.iframe-size {
  height: 100%;
  width: 100%;
  border: none;
}
</style>


<style scoped>
</style>

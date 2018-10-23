<template>
   <v-container fill-height fluid>
      <iframe :src="src" class="iframe-size"></iframe>
   </v-container>
</template>


<script>
export default {
  data: () => ({
    src: "https://partner.parkingservice.ru"
  })
};
</script>

<style scoped>
</style>

<template>
    <v-container fluid class="invisible">
        <v-layout column wrap align-center>
            <v-flex xs1 sm1 d-flex align-end>
                <v-select
                        v-model="$i18n.locale"
                        :items="langs"
                ></v-select>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return { langs: ['ru', 'en'] }
        }
    }
</script>

<style scoped>
    .invisible {
        opacity: 0;
    }
</style>
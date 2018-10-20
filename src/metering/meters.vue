<template>
   <v-container grid-list-md fill-height fluid>
      <v-layout column >
         <v-flex d-flex md8>
            <v-layout row wrap>
               <v-flex d-flex md4>
                  <v-layout column >
                     <v-flex d-flex md6>
                         <v-card flat>
                            <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=10" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                         </v-card>
                     </v-flex>
                     <v-flex d-flex md2>
                        <v-layout row wrap>
                           <v-flex v-for="(d,i) in L" d-flex md4>
                              <div v-bind:class="[d.c,'singlestat']">
                                 <div>{{$t("message.power")}} L{{i+1}}</div>
                                 <div class="value">{{d.value | power}}</div>
                              </div>
                           </v-flex>
                        </v-layout>
                     </v-flex>
                     <v-flex d-flex md4>
                         <v-card flat>
                            <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=6" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                         </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex d-flex md8>
                   <v-card flat>
                      <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=12" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                   </v-card>
               </v-flex>
            </v-layout>
         </v-flex>
         <v-flex d-flex md4>
            <v-layout row wrap>
               <v-flex d-flex md4>
                  <div class="gauge">
                     <div>{{$t("message.imbalance")}}</div>
                     <donut-chart :data="L"></donut-chart>
                  </div>
               </v-flex>
               <v-flex d-flex md8>
                  <v-layout row wrap>
                     <v-flex d-flex md4>
                        <v-card flat>
                           <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=17" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                        </v-card>
                     </v-flex>
                     <v-flex d-flex md4>
                        <v-card flat>
                           <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=20" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                        </v-card>
                     </v-flex>
                     <v-flex d-flex md4>
                        <v-card flat>
                           <iframe src="/grafana/d-solo/Rfv-XEHmk/scpower?panelId=21" class="iframe-size" scrolling="no" frameborder="0"></iframe>
                        </v-card>
                     </v-flex>
                  </v-layout>
               </v-flex>
            </v-layout>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
import Vue from "vue";
import VueTimers from "vue-timers";
Vue.use(VueTimers);

import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, Axios);

import DonutChart from "../common/charts/DonutChart";

export default {
  components: {
    DonutChart,
  },
  data: () => ({
    L: [{value:0,c:"norm",title:"L1",color:"#7EB26D"},
        {value:0,c:"norm",title:"L2",color:"#EAB839"},
        {value:0,c:"norm",title:"L3",color:"#6ED0E0"}]
  }),
  timers: {
    update_L: { time: 5000, autostart: true, repeat: true }
  },
  methods: {
      update_L() {
        const prefix="/wb/AN4SSJFL/wb-map12h/156/Ch_";
        var s="";
        for (var i=1; i<4; i++)
          for (var j=1; j<2; j++)
             s+="SELECT last(value) FROM \""+prefix+j+"_P_L"+i+"\";"
        Vue.axios
        .post("/query",
              "db=glue&q="+encodeURIComponent(s),
              {
                 headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                 }
              }
        )
        .then(response => {
           this.L.map(function(L,i) {
              var P=
                 response.data.results.map(function(result) {
                    if (result.series && RegExp(prefix+"[1-4]_P_L"+(Number(i)+1)).test(result.series[0].name))
                       return result.series[0].values[0][1];
                    return 0;
                 })
                 .reduce((a, b) => a + b, 0);
               L.value=Math.max(P,0);
               L.c=P>300 ? 'crit' : P>100 ? 'warn' : 'norm';
            })
          })
          .catch(error => {
            console.log(error);
          });
      }
  },
  filters: {
    power (value) {
      return value.toLocaleString(undefined, {maximumFractionDigits: value>=10 ? 0 : 2})+"W";
    }
  }
};
</script>
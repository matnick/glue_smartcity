<template lang=html>
  <v-app id="inspire">
       <v-navigation-drawer
      :clipped="true"
      :mini-variant.sync="menu_collapsed"
      fixed app disable-resize-watcher permanent touchless width=250
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item.alticon"
            append-icon=""
            v-bind:value="get_expanded_status(item.path)"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
               :to="{path: child.path}"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon small class="ml-2">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="ml-2">
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="{path: item.path}">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <language-select class="language-select"></language-select>
    </v-navigation-drawer>

   <v-toolbar color="primary" dark app fixed clipped-left class="toolbar">
      <v-btn icon @click="toggle_menu"><v-icon>fa-bars</v-icon></v-btn>
      <v-menu>
         <v-toolbar-title  slot="activator">
            <img class="mr-3 mt-2" src="./assets/logo_nokia.svg" height="25px" alt="Nokia Logo">
            {{$t("message.smart_city_control_center")}}
         </v-toolbar-title>
      </v-menu>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
         <div class="title mt-4" >{{$t("message.powered_by_impact")}}</div>
      </v-toolbar-items>
   </v-toolbar>

    <v-content>
       <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vue_i18n from 'vue-i18n';
import Vuex from "vuex";
Vue.use(Vue_i18n, Vuex);

import languageSelect from "./common/language-select.vue";

export default {
  components: {
      languageSelect
  },
  data: () => ({
    menu_collapsed: true
  }),
  methods: {
    get_expanded_status(path) {
      if (window.location.href.includes(path)) {
        return true;
      }

      return false;
    },
    toggle_menu() {
      this.menu_collapsed = !this.menu_collapsed;
    }
  },
  computed: {
      items () { return [
            {
                path: "dashboard",
                text: this.$i18n.t("message.dashboard"),
                icon: "fa-tachometer-alt"
            },
            {
                path: "eco_monitoring",
                text: this.$i18n.t("message.ecological_monitoring"),
                icon: "fa-tree",
                alticon: "fa-tree",
                children: [
                    {
                        icon: "fa-map",
                        path: "/eco_monitoring/map",
                        text: this.$i18n.t("message.map")
                    },
                    {
                        icon: "fa-th-list",
                        path: "/eco_monitoring/stations",
                        text: this.$i18n.t("message.stations")
                    },
                    /* {
                      icon: "fa-calendar-alt",
                      path: "/eco_monitoring/history",
                      text: "Historical data"
                    }, */
                    {
                        icon: "fa-calendar-alt",
                        path: "/eco_monitoring/aqi",
                        text: this.$i18n.t("message.partner")+" #1"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/eco_monitoring/sityair",
                        text: this.$i18n.t("message.partner")+" #2"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/eco_monitoring/aqi",
                        text: this.$i18n.t("message.partner")+" #3"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/eco_monitoring/sityair",
                        text: this.$i18n.t("message.partner")+" #4"
                    }
                ]
            },
            {
                path: "parking",
                text: this.$i18n.t("message.parking"),
                icon: "fa-car",
                alticon: "fa-car",
                children: [
                    /* {
                      icon: "fa-chart-line",
                      path: "/parking/stat",
                      text: "Statistic"
                    }, */
                    {
                        icon: "fa-map",
                        path: "/parking/map",
                        text: this.$i18n.t("message.map")
                    }
                ]
            },
            {
                path: "lighting",
                text: this.$i18n.t("message.lighting"),
                icon: "fa-lightbulb",
                alticon: "fa-lightbulb",
                children: [
                     {
                      icon: "fa-sliders-h",
                      path: "/lighting/main",
                      text: "Main"
                    },
                   /* {
                      icon: "fa-chart-line",
                      path: "/lighting/energy_management",
                      text: "Management"
                    },*/
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/lighting/unilight",
                        text: this.$i18n.t("message.partner")+" #1"
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/lighting/unilight",
                        text: this.$i18n.t("message.partner")+" #2"
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/lighting/unilight",
                        text: this.$i18n.t("message.partner")+" #3"
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/lighting/unilight",
                        text: this.$i18n.t("message.partner")+" #4"
                    }
                ]
            },
            {
                path: "safety",
                text: this.$i18n.t("message.safety"),
                icon: "fa-unlock-alt",
                alticon: "fa-unlock-alt",
                children: [
                    /* {
                      icon: "fa-key",
                      path: "/safety/acs_lora",
                      text: "Access Control System"
                    }, */
                    {
                        icon: "fa-video",
                        path: "/safety/video-analitics",
                        text: this.$i18n.t("message.video_analytics"),
                    },
                    {
                        icon: "fa-video",
                        path: "/safety/video-monitoring",
                        text: this.$i18n.t("message.video_monitoring"),
                    }
                ]
            },
            {
                path: "metering",
                text: this.$i18n.t("message.metering"),
                icon: "fa-chart-bar",
                alticon: "fa-chart-bar",
                children: [
                    {
                        icon: "fa-sliders-h",
                        path: "/metering/company",
                        text: this.$i18n.t("message.management_company_page")
                    },
                    {
                        icon: "fa-user",
                        path: "/metering/personal",
                        text: this.$i18n.t("message.personal_account")
                    },
                    {
                        icon: "fa-compress",
                        path: "/metering/meters",
                        text: this.$i18n.t("message.meters")
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/metering/linergo",
                        text: this.$i18n.t("message.partner")+" #1"
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/metering/gascloud",
                        text: this.$i18n.t("message.partner")+" #2"
                    },
                    {
                        icon: "fa-external-link-square-alt",
                        path: "/metering/linergo",
                        text: this.$i18n.t("message.partner")+" #3"
                    }
                ]
            },
            {
                path: "infrastructure",
                text: this.$i18n.t("message.infrastructure"),
                icon: "fa-plug",
                alticon: "fa-plug",
                children: [
                    {
                        icon: "fa-chart-line",
                        path: "/infrastructure/monitoring",
                        text: this.$i18n.t("message.monitoring")
                    },
                    {
                        icon: "fa-chart-line",
                        path: "/infrastructure/gateways",
                        text: this.$i18n.t("message.gateways")
                    },
                    /*           {
                      icon: "fa-chart-line",
                      path: "/infrastructure/managment",
                      text: "Management"
                    }, */
                    {
                        icon: "fa-exclamation-triangle",
                        path: "/infrastructure/incidents",
                        text: this.$i18n.t("message.incidents")
                    }
                ]
            },
            {
                path: "waste",
                text: this.$i18n.t("message.waste"),
                icon: "fa-trash-alt",
                alticon: "fa-trash-alt",
                children: [
                    /* {
                      icon: "fa-chart-line",
                      path: "/waste/stat",
                      text: "Statistic"
                    }, */
                    {
                        icon: "fa-th-list",
                        path: "/waste/containers",
                        text: this.$i18n.t("message.containers")
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/waste/planning",
                        text: this.$i18n.t("message.planning")
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/waste/managment",
                        text: this.$i18n.t("message.partner")+" #1"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/waste/managment",
                        text: this.$i18n.t("message.partner")+" #2"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/waste/managment",
                        text: this.$i18n.t("message.partner")+" #3"
                    },
                    {
                        icon: "fa-calendar-alt",
                        path: "/waste/managment",
                        text: this.$i18n.t("message.partner")+" #4"
                    }
                ]
            }
        ]
  }}
};
</script>

<style>
.toolbar {
  z-index: 10;
}
</style>

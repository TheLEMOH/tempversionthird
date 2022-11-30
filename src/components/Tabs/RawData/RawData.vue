<template>
  <div class="raw-data">
    <div class="one">
      <Profile
        :id="'profile'"
        :height="heightProfile"
        :startChart="'profile'"
        :site="4310"
        :menu="profileMenu"
      ></Profile>
    </div>
    <div class="two">
      <Chart :id="'rawData1'" :height="heightChart" :startChart="'termogramma'" :menu="chartMenu"></Chart>
    </div>
    <div class="three">
      <Chart :id="'rawData2'" :height="heightChart" :startChart="'atmosphere'" :menu="chartMenu"></Chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from "../Chart/Chart.vue";
import Profile from "../Chart/Profile.vue";
export default {
  components: { Chart, Profile },
  computed: {
    ...mapGetters([
      "chartMenuMain",
      "chartsAdditional",
      "profileMenu",
      "activeSite",
    ]),
    heightProfile() {
      const heightWindow = window.innerHeight;
      const profileheight = heightWindow - 70 - 50 - 10;
      return profileheight + "px";
    },

    heightChart() {
      const heightWindow = window.innerHeight;
      const chartHeight = (heightWindow - 70 - 50 - 50 - 13) / 2;
      return chartHeight + "px";
    },

    chartMenu() {
      if (this.activeSite == 4310) return this.chartMenuMain;
      else return this.chartsAdditional;
    },
  },
};
</script>

<style>
</style>
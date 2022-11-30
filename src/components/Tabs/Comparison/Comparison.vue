<template>
  <div class="raw-data">
    <div class="one">
      <Profile :height="heightProfile" :site="4310" :menu="profileMenu" :startChart="'profile'"></Profile>
    </div>
    <div class="two">
      <Chart
        :id="'comparison1'"
        :height="heightChart"
        :startChart="'termogramma'"
        :menu="chartMenuMain"
      ></Chart>
      <ChartArray
        :id="'comparison2'"
        :height="heightChart"
        :startChart="'termogramma'"
        :menu="chartsAdditional"
      ></ChartArray>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Chart from "../Chart/Chart.vue";
import ChartArray from "../Chart/ChartArray.vue";
import Profile from "../Chart/Profile.vue";
export default {
  components: { Profile, Chart, ChartArray },
  computed: {
    ...mapGetters(["chartMenuMain", "profileMenu", "chartsAdditional"]),
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
  },
};
</script>

<style>
</style>
<template>
  <el-card class="comparison-box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span class="name-chart">Профиль</span>
        <span class="timestamp">{{time}}</span>
        <Menu :menu="menu" :selected-chart="chart" @change-chart="ChangeChart"></Menu>
      </div>
    </template>
    <div ref="chart" class="chart" :style="{ height: height }"></div>
  </el-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Menu from "./ChartMenu.vue";
import Plotly from "plotly.js-dist-min";
import layouts from "./layouts/layouts";
export default {
  props: ["site", "startChart", "height", "id", "menu"],
  components: { Menu },
  data() {
    return {
      config: { responsive: true },
    };
  },
  async mounted() {
    this.Create();
  },

  async beforeUnmount() {
    const chart = this.$refs.chart;
    chart.removeAllListeners("plotly_restyle");
  },

  computed: {
    ...mapGetters([
      "activeSite",
      "sites",
      "chartData",
      "profileInversion",
      "profiles",
      "difference",
      "adiabats",
      "activeTab",
      "onAdiabats",
      "disabledProfile",
      "windows",
      "x",
    ]),
    time() {
      if (this.x) {
        const time = this.x.split(":");
        return `${time[0]}:${time[1]}`;
      } else {
        return "";
      }
    },
    chart() {
      const chart = this.windows[this.id];
      return chart || this.startChart;
    },
  },
  methods: {
    ...mapActions(["UpdateDisabledProfile", "UpdateWindow"]),

    async ChangeChart(chart) {
      this.UpdateWindow({ id: this.id, chart: chart });
      this.Update(chart);
    },

    GetData(chart = this.chart) {
      let adiabats = [];
      let profiles = [];
      if (chart == "profile")
        if (this.activeTab == "rawData") {
          if (this.activeSite == 4310) {
            adiabats = this.onAdiabats
              ? this.adiabats.filter((o) => o.id == this.activeSite)
              : [];
            profiles = this.profiles.filter((o) => o.id == this.activeSite);
          } else {
            adiabats = this.onAdiabats
              ? this.adiabats.filter((o) => o.id != 4310)
              : [];
            profiles = this.profiles.filter((o) => o.id != 4310);
          }
        } else {
          adiabats = this.onAdiabats ? this.adiabats : [];
          profiles = this.profiles;
        }
      else profiles = this.difference;
      const data = [...profiles, ...adiabats];
      return data;
    },

    GetTemplate(chart = this.chart) {
      let shapes = [];
      let annotations = [];
      if (chart == "profile")
        if (this.activeTab == "rawData") {
          if (this.activeSite == 4310) {
            shapes = this.profileInversion.shapes.filter(
              (o) => o.id == this.activeSite
            );
            annotations = this.profileInversion.annotations.filter(
              (o) => o.id == this.activeSite
            );
          } else {
            shapes = this.profileInversion.shapes.filter((o) => o.id != 4310);
            annotations = this.profileInversion.annotations.filter(
              (o) => o.id != 4310
            );
          }
        } else {
          shapes = this.profileInversion.shapes;
          annotations = this.profileInversion.annotations;
        }

      const layout = layouts[chart];

      const template = { ...layout, shapes, annotations };
      return template;
    },

    async Create() {
      const chart = this.$refs.chart;
      const data = this.GetData();
      const template = this.GetTemplate();
      Plotly.newPlot(chart, {
        data: data,
        layout: template,
        config: this.config,
      });

      chart.on("plotly_restyle", (event) => {
        const visible = event[0].visible;
        const index = event[1][0];
        const id = this.profiles[index].id;
        this.UpdateDisabledProfile({ id, visible });
      });
    },
    async Update(c = this.chart) {
      const chart = this.$refs.chart;
      const data = this.GetData(c);
      const template = this.GetTemplate(c);
      Plotly.react(chart, data, template);
    },
  },
  watch: {
    profiles: {
      handler: async function () {
        this.Update();
      },
      deep: true,
      immediate: false,
    },
    async activeTab() {
      this.Update();
    },
    async activeSite() {
      this.Update();
    },
    async onAdiabats() {
      this.Update();
    },
    async disabledProfile() {
      this.Update();
    },
  },
};
</script>

<style>
.comparison-box-card {
  height: auto;
  min-width: 200px;
}
</style>
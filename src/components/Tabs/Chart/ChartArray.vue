<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span class="name-chart">{{ codes }} :: {{ nameChart }}</span>
        <Menu :menu="menu" :selectedChart="chart" @change-chart="ChangeChart"></Menu>
      </div>
    </template>
    <div ref="chart" class="chart" :style="{ height: height }"></div>
  </el-card>
</template>

<script>
import Menu from "./ChartMenu.vue";
import Plotly from "plotly.js-dist-min";
import { mapActions, mapGetters } from "vuex";
import layouts from "./layouts/layouts";
export default {
  props: ["height", "startChart", "site", "menu", "id"],
  components: { Menu },
  data() {
    return {
      config: { responsive: true, locale: "ru" },
    };
  },
  async mounted() {
    this.Create();
  },
  async beforeUnmount() {
    const chart = this.$refs.chart;
    chart.removeAllListeners("plotly_click");
    chart.removeAllListeners("plotly_relayout");
  },
  computed: {
    ...mapGetters([
      "sites",
      "chartData",
      "activeSite",
      "activeTab",
      "activePostComparison",
      "activeMode",
      "timestamp",
      "profileInversion",
      "detailsTermogramm",
      "borders",
      "onBorders",
      "startPoints",
      "relayout",
      "windows",
      "chartMenuMain",
      "onDirection",
      "windDirection"
    ]),
    codes() {
      const sites = this.sites.filter((s) => s.id != 4310);
      let codes = "";
      for (let i = 0, length = sites.length; i < length; i++) {
        if (sites[i].data) codes += sites[i].name.split("-")[0];
      }
      return codes;
    },
    chart() {
      const ownChart = this.windows[this.id];
      return ownChart || this.startChart;
    },
    nameChart() {
      const chart = this.chartMenuMain.find((c) => c.id == this.chart);
      return chart.name;
    },
  },
  methods: {
    ...mapActions([
      "UpdateProfile",
      "UpdateProfileTimeSeries",
      "UpdateDataFromGantt",
      "UpdateTimestamp",
      "UpdateRelaout",
      "UpdateWindow",
    ]),

    async ChangeChart(chart) {
      this.UpdateWindow({ id: this.id, chart: chart });
      this.Update(chart);
    },

    GetData(chart = this.chart) {
      const data = this.chartData[1] ? this.chartData[1][chart] : [];

      if (this.chart == "termogramma")
        data.forEach((d) => {
          if (+d.name % 100 != 0 && d.name != "T") {
            d.visible = this.detailsTermogramm;
          }
        });

      return data;
    },

    GetTemplate(chart = this.chart) {
      const site = 1
      const layout = layouts[chart];
      const timestamp = this.timestamp;
      const points = this.onBorders ? this.startPoints : [];
      const borders = this.onBorders ? this.borders : [];
      const shapes = [...borders, ...timestamp.shapes];
      const directions = this.windDirection[site] && this.chart == 'windpm' && this.onDirection ? this.windDirection[site] : []
      const annotations = [...points, ...timestamp.annotations, ...directions];
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

      chart.on("plotly_click", (data) => {
        const activeSite = this.activeSite;
        const points = data.points[0];
        const x =
          points.x.split(" ").length == 1
            ? points.x + " 00:00:00"
            : points.x + ":00";

        this.UpdateTimestamp(x);
        this.UpdateProfile({ date: x, site: activeSite.id });
      });

      chart.on("plotly_relayout", (event) => {
        const autosize = event.autosize;
        const range = event["xaxis.range[0]"];
        const autorange = event["xaxis.autorange"];
        if (!autosize && (range || autorange)) {
          const id = this.id;
          this.UpdateRelaout({ event, id });
        }
      });

      if (this.relayout.event) Plotly.relayout(chart, this.relayout.event);
    },

    async Update() {
      const chart = this.$refs.chart;
      const data = this.GetData();
      const template = this.GetTemplate();

      Plotly.react(chart, data, template, this.config);
    },

    async Relayout() {
      const chartRef = this.$refs.chart;
      const template = this.GetTemplate();
      Plotly.relayout(chartRef, template);
    },

    async Sync() {
      const chartRef = this.$refs.chart;
      const relayout = this.relayout;
      Plotly.relayout(chartRef, relayout.event);
    },
  },

  watch: {
    chartData: {
      handler: async function () {
        this.Update();
      },
      deep: true,
      immediate: false,
    },
    async activeSite() {
      this.Update();
    },
    async timestamp() {
      this.Relayout();
    },
    async borders() {
      this.Relayout();
    },
    async onBorders() {
      this.Relayout();
    },
    async onDirection() {
      this.Relayout();
    },
    relayout: {
      handler(val, old) {
        const snew = JSON.stringify(val.event);
        const sold = JSON.stringify(old.event);
        if (snew != sold) {
          this.Sync();
        }
      },
    },
  },
};
</script>

<style>

</style>
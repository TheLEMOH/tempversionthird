<template>
  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span class="name-chart">{{ code }} :: {{ nameChart }}</span>
        <Menu :menu="menu" :selectedChart="chart" @change-chart="ChangeChart"></Menu>
      </div>
    </template>
    <div ref="chart" class="chart" :style="{ height: height }"></div>
  </el-card>
</template>

<script>
import Menu from "./ChartMenu.vue";
import Plotly from "plotly.js-dist-min";
import locale from "plotly.js-locales/ru";
import { mapActions, mapGetters } from "vuex";
import layouts from "./layouts/layouts";
export default {
  props: ["height", "startChart", "site", "menu", "id"],
  components: { Menu },
  data() {
    return {
      l: JSON.parse(JSON.stringify(layouts)),
      config: { responsive: true },
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
      "borders",
      "startPoints",
      "onBorders",
      "relayout",
      "detailsTermogramm",
      "windows",
      "windDirection",
      "onDirection",
      "dateControl",
    ]),
    code() {
      const activeSite = this.site || this.activeSite;
      const site = this.sites.find((s) => s.id == activeSite);
      if (this.chart == "atmosphereDifference") return "#2 - #1";
      else return site ? site.name.split("-")[0] : "Не инициализировано";
    },
    chart() {
      const chart = this.windows[this.id];
      return chart || this.startChart;
    },
    nameChart() {
      const chart = this.menu.find((c) => c.id == this.chart);
      return chart ? chart.name : "Не инициализировано";
    },
  },
  methods: {
    ...mapActions(["UpdateProfile", "UpdateProfileTimeSeries", "UpdateDataFromGantt", "UpdateTimestamp", "UpdateRelaout", "UpdateWindow"]),

    async ChangeChart(chart) {
      this.UpdateWindow({ id: this.id, chart: chart });
      this.Update(chart);
    },

    GetData(chart = this.chart) {
      const site = this.site ? this.site : this.activeSite;
      const data = this.chartData[site] ? this.chartData[site][chart] : [];

      if (this.chart == "termogramma")
        data.forEach((d) => {
          if (+d.name % 100 != 0 && d.name != "T") {
            d.visible = this.detailsTermogramm;
          }
        });

      return data;
    },

    GetTemplate(chart = this.chart) {
      const site = this.site ? this.site : this.activeSite;
      const layout = this.l[chart];
      const timestamp = this.timestamp;
      const borders = this.onBorders && site != 4310 ? this.borders : [];
      const points = this.onBorders && site != 4310 ? this.startPoints : [];
      const directions = this.windDirection[site] && this.chart == "windpm" && this.onDirection ? this.windDirection[site] : [];
      const shapes = [...borders, ...timestamp.shapes];
      const annotations = [...timestamp.annotations, ...points, ...directions];

      const template = { ...layout, shapes, annotations };

      return template;
    },

    async Create() {
      const chart = this.$refs.chart;
      const data = this.GetData();
      const template = this.GetTemplate();

      Plotly.register(locale);
      Plotly.setPlotConfig({ locale: "ru" });

      Plotly.newPlot(chart, {
        data: data,
        layout: template,
        config: this.config,
      });

      chart.on("plotly_click", (data) => {
        const activeSite = this.activeSite;
        const points = data.points[0];
        const x = points.x.split(" ").length == 1 ? points.x + " 00:00:00" : points.x + ":00";

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

    async Update(c) {
      const chart = this.$refs.chart;
      const data = this.GetData(c);
      const template = this.GetTemplate(c);

      Plotly.react(chart, data, template);
    },

    async Relayout() {
      const chart = this.$refs.chart;
      const template = this.GetTemplate();
      Plotly.relayout(chart, template);
    },

    async ToggleVisible(visible) {
      const chart = this.$refs.chart;
      const data = [...chart.data];
      const template = this.GetTemplate();

      data.forEach((d) => {
        if (+d.name % 100 != 0 && d.name != "T") {
          d.visible = visible;
        }
      });

      Plotly.react(chart, data, template);
    },

    async Sync() {
      const chart = this.$refs.chart;
      const relayout = this.relayout;
      if (relayout.event) {
        Plotly.relayout(chart, relayout.event);
      } else {
        Plotly.relayout(chart, { "xaxis.autorange": true });
      }
    },
  },

  watch: {
    async chartData() {
      this.Update();
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
    async detailsTermogramm(newVal) {
      if (this.chart == "termogramma") this.ToggleVisible(newVal);
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

<style></style>

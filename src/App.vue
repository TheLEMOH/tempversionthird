<template >
  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="Загрузка и обработка данных" style="height:100vh">
    <ControlsVue></ControlsVue>
    <RawData v-if="activeTab == 'rawData'"></RawData>
    <Comparison v-if="activeTab == 'comparison'"></Comparison>
  </div>
</template>

<script>
import ControlsVue from "./components/Controls/Controls.vue";
import { GetParams, SetParams } from "./store/controls/url";
import { mapActions, mapGetters } from "vuex";

import { defineAsyncComponent } from "vue";

export default {
  name: "App",
  components: {
    ControlsVue,
    RawData: defineAsyncComponent(() =>
      import("./components/Tabs/RawData/RawData.vue")
    ),
    Comparison: defineAsyncComponent(() =>
      import("./components/Tabs/Comparison/Comparison.vue")
    ),
  },
  mounted() {
    const params = GetParams();
    const window = {
      rawData1: params.rawData1,
      rawData2: params.rawData2,
      comparison1: params.comparison1,
      comparison2: params.comparison2,
    };
    this.UpdateX(params.timestamp);
    this.UpdateTab(params.tab);
    this.UpdateSite(params.site);
    this.UpdateWindows(window);
    this.UpdateRelaout(params.relayout);
    this.GetSets({ date: [params.start, params.end] });
  },
  methods: {
    ...mapActions([
      "UpdateDate",
      "UpdateTab",
      "UpdateX",
      "UpdateSite",
      "GetSets",
      "UpdateWindows",
      "UpdateRelaout",
    ]),
  },
  computed: {
    ...mapGetters(["activeTab", "loading", "sites", "params"]),
  },
  watch: {
    params: {
      handler: async function (newProp) {
        SetParams(newProp);
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style>
html {
  font-family: Arial, Helvetica, sans-serif !important;
}

body {
  background: #e9e9eb;
  margin: 0;
  padding: 0;
}

.shadow {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.one {
  grid-area: one;
}

.two {
  grid-area: two;
}

.three {
  grid-area: three;
}

.four {
  grid-area: four;
}

::-webkit-scrollbar {
  width: 0;
}

.raw-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 89vh;
  grid-template-areas:
    "one one two two two two two two"
    "one one three three three three three three";
}

@media only screen and (max-width: 850px) {
  .raw-data {
    height: auto;
    grid-template-rows: 1fr auto auto;
    grid-template-areas:
      "one one one one one one one one"
      "two two two two two two two two"
      "three three three three three three three three";
  }
}

.card-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.name-chart {
  font-weight: bold;
}

.timestamp {
  margin: 1em;
}

.el-card__header {
  padding: 0.5em !important;
  padding-left: 1em !important;
  height: 50px;
  display: flex;
  align-items: center;
}

.box-card {
  height: auto;
}

.el-card__body {
  padding: 0 !important;
}

.chart {
  width: 100%;
}

.nums {
  white-space: inherit !important;
}
</style>

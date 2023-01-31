<template>
  <el-dropdown trigger="click">
    <el-button circle size="default" plain type="primary" class="el-dropdown-link">
      <el-icon size="default">
        <TrendCharts />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :class="[selectedChart == chart.id ? 'selected-chart' : null]" v-for="chart in menu"
          :key="chart.id" @click="this.$emit('change-chart', chart.id)">{{ chart.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { TrendCharts } from "@element-plus/icons-vue";
export default {
  props: ["selectedChart", "menu"],
  emits: ["change-chart"],
  components: { TrendCharts },
  data() {
    return {};
  },
};
</script>

<style>
.selected-chart {
  background: #337ecc !important;
  color: white !important;
}
</style>
<template>
  <SectionMenu>
    <template #name>Дополнительные настройки</template>
    <template #body>
      <h1>Общее</h1>
      <el-checkbox :value="onBorders" :label="'Периоды работы профилемера #2'"
        :disabled="activeSite == 4310 && activeTab == 'rawData'" @change="UpdateOnBorders"></el-checkbox>
      <h1>Термограммы</h1>
      <el-checkbox :value="detailsTermogramm" :label="'Подробные данные термограмм'"
        @change="UpdateDetailsTermogramm"></el-checkbox>
      <h1>PM2.5 и Ветер</h1>
      <el-checkbox :value="onDirection" :label="'Направление ветра'" @change="UpdateOnDirection"></el-checkbox>
      <h1>Профиль</h1>
      <el-checkbox :value="onAdiabats" :label="'Сухая адиабата'" @change="UpdateOnAdiabats"></el-checkbox>
      <el-row :gutter="30">
        <el-col :span="16">
          <el-checkbox :value="onManually" :label="'Ручные минимум и максимум для разницы температур'"
            @change="UpdateOnManually"></el-checkbox>
        </el-col>
        <el-col :span="5">
          <el-input v-model="minmax" :disabled="!onManually" :maxlength="1"></el-input>
        </el-col>
      </el-row>
      <h1>Интерполяция</h1>
      <el-row :gutter="30">
        <el-col :span="16">
          <el-checkbox :value="onInterpolate" :label="'Включить интерполяцию данных'" :disabled="loading"
            @change="UpdateOnInterpolate"></el-checkbox>
        </el-col>
        <el-col :span="5">
          <el-input :value="INTERPOLATESTEP" :disabled="true" :maxlength="2" :minlength="2"></el-input>
        </el-col>
      </el-row>
    </template>
  </SectionMenu>
</template>
  
<script>
import SectionMenu from "./SectionMenu.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SectionMenu,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "UpdateOnBorders",
      "UpdateOnAdiabats",
      "UpdateDetailsTermogramm",
      "UpdateOnManually",
      "UpdateManuallyMinMax",
      "UpdateOnDirection",
      "UpdateOnInterpolate"
    ]),
  },
  computed: {
    ...mapGetters([
      "onBorders",
      "onAdiabats",
      "activeSite",
      "activeTab",
      "detailsTermogramm",
      "onManually",
      "manuallyMinMax",
      "onDirection",
      "onInterpolate",
      "INTERPOLATESTEP",
      "loading"
    ]),

    minmax: {
      get() {
        return this.manuallyMinMax;
      },
      set(value) {
        if (typeof +value == 'number')
          this.UpdateManuallyMinMax(value);
      },
    },
  },
};
</script>
  
<style>

</style>
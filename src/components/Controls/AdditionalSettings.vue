<template>
  <SectionMenu>
    <template #name>Дополнительные настройки</template>
    <template #body>
      <h1>Общее</h1>
      <el-checkbox
        :value="onBorders"
        :label="'Периоды работы профилемера #2'"
        :disabled="activeSite == 4310 && activeTab=='rawData'"
        @change="UpdateOnBorders"
      ></el-checkbox>
      <h1>Термограммы</h1>
      <el-checkbox
        :value="detailsTermogramm"
        :label="'Подробные данные термограмм'"
        @change="UpdateDetailsTermogramm"
      ></el-checkbox>
      <h1>Профиль</h1>
      <el-checkbox :value="onAdiabats" :label="'Сухая адиабата'" @change="UpdateOnAdiabats"></el-checkbox>
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
    ]),
  },
  computed: {
    ...mapGetters([
      "onBorders",
      "onAdiabats",
      "activeSite",
      "activeTab",
      "detailsTermogramm",
    ]),
  },
};
</script>
  
  <style>
</style>
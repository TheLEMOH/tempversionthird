<template>
  <el-button type="primary" size="large" plain @click="UpdateMapModal(true)">
    <el-icon :size="24">
      <MapLocation />
    </el-icon>
  </el-button>
</template>
    <script>
import { MapLocation } from "@element-plus/icons-vue";
import { mapActions } from "vuex";
export default {
  components: {
    MapLocation,
  },
  methods: {
    ...mapActions(["UpdateMapModal"]),
  },
};
</script>
    
    <style>
</style>
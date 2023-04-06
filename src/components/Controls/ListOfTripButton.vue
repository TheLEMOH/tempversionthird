<template>
  <el-button type="primary" size="large" plain @click="UpdateListOfTripDisplay(true)">
    <el-icon :size="24">
      <Van />
    </el-icon>
  </el-button>
</template>
<script>
import { Van } from "@element-plus/icons-vue";
import { mapActions } from "vuex";
export default {
  components: {
    Van,
  },
  methods: {
    ...mapActions(["UpdateListOfTripDisplay"]),
  },
};
</script>

<style></style>

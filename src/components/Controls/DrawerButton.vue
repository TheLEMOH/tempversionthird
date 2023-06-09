<template>
  <el-button type="primary" size="large" plain @click="UpdateDrawer(true)">
    <el-icon :size="24">
      <Operation />
    </el-icon>
  </el-button>
</template>
<script>
import { Operation } from "@element-plus/icons-vue";
import { mapActions } from "vuex";
export default {
  components: {
    Operation,
  },
  methods: {
    ...mapActions(["UpdateDrawer"]),
  },
};
</script>

<style></style>

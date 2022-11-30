<template>
  <el-button type="primary" plain size="large" @click="CopyUrl">
    <el-icon :size="24">
      <Link />
    </el-icon>
  </el-button>
</template>

<script>
import { Link } from "@element-plus/icons-vue";
import { mapActions } from "vuex";
export default {
  components: {
    Link,
  },
  methods: {
    ...mapActions(["CopyUrl"]),
  },
};
</script>

<style>
</style>
<template>
  <el-button type="primary" size="large" plain @click="UpdateAbout(true)">
    <el-icon :size="24">
      <QuestionFilled />
    </el-icon>
  </el-button>
</template>
<script>
import { QuestionFilled } from "@element-plus/icons-vue";
import { mapActions } from "vuex";
export default {
  components: {
    QuestionFilled,
  },
  methods: {
    ...mapActions(["UpdateAbout"]),
  },
};
</script>


<style>

</style>
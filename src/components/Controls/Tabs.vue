<template>
  <div class="tabs-panel" @mouseover="MouseOver" @mouseleave="MouseLeave">
    <div class="always">
      <slot name="always"></slot>
    </div>
    <div class="hover" v-show="open">
      <slot name="body"></slot>
    </div>
    <div class="unhover" v-show="!open">
      <slot name="unhover"></slot>
      <el-icon>
        <ArrowDownBold></ArrowDownBold>
      </el-icon>
    </div>
  </div>
</template>

<script>
import { ArrowDownBold } from "@element-plus/icons-vue";
export default {
  components: { ArrowDownBold },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    MouseOver() {
      this.open = true;
    },
    MouseLeave() {
      this.open = false;
    },
  },
};
</script>

<style>
.tabs-panel {
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  margin-left: 0.3em;
  margin-right: 0.3em;
  padding: 0.5em;
  overflow: hidden;
  height: 59px;
  min-width: 100px;
  text-align: center;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  transition: all 0.3s;
}

.tabs-panel:hover {
  width: auto;
  height: auto;
  transition: all 0.3s;
}

.tab {
  min-width: 125px;
  padding: 0.3em;
  margin-bottom: 0.3em;
  text-align: center;
  border-radius: 10px;
  transition: all 0.3s;
}

.active-tab {
  background: #409eff !important;
  color: white;
}

.hover {
  display: flex;
  flex-direction: column;
}

.tab:hover {
  background: #d9ecff;
  transition: all 0.3s;
  cursor: pointer;
}
</style>
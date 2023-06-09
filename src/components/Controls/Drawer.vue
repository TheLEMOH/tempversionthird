<template>
  <el-drawer modal-class="drawer-menu" v-model="modal" size="400px">
    <template #title>
      <strong style="color: black; font-size: 1.4em">Настройки</strong>
    </template>
    <!--     <Post></Post> -->
    <Views></Views>
    <AdditionalSettings></AdditionalSettings>
  </el-drawer>
</template>

<script>
import Views from "./Views.vue";
/* import Post from "./Rawdata/Post.vue"; */
import AdditionalSettings from "./AdditionalSettings.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Views,
    AdditionalSettings,
  },
  methods: {
    ...mapActions(["UpdateDrawer"]),
  },
  computed: {
    ...mapGetters(["drawer"]),
    modal: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.UpdateDrawer(value);
      },
    },
  },
};
</script>

<style>
h1 {
  font-size: 1em !important;
}

.el-drawer__header {
  margin-bottom: 0 !important;
}

.drawer-menu {
  display: flex;
  align-items: center;
}

.section-menu {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #eee;
  padding-bottom: 1em;
}

.el-checkbox__label {
  white-space: normal;
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

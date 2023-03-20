<template>
  <el-dialog v-model="modal" title="Карта" fullscreen>
    <Map v-if="sites.length != 0"></Map>
  </el-dialog>
</template>

<script>
import Map from "./Map.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: { Map },
  methods: {
    ...mapActions(["UpdateMapModal"]),
  },
  computed: {
    ...mapGetters(["mapModal", "sites"]),
    modal: {
      get() {
        return this.mapModal;
      },
      set(value) {
        this.UpdateMapModal(value);
      },
    },
  },
};
</script>

<style>
.map-menu {
  display: flex;
}

.el-dialog__body {
  padding: 0 !important;
  margin: 0;
}
</style>

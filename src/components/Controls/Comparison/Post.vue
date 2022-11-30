<template>
  <SectionMenu>
    <template #name>Режим</template>
    <template #body>
      <el-checkbox
        :label="site.name"
        :model-value="activeSite"
        v-for="site in sites"
        :key="site.id"
        @change="UpdateSite(site.id)"
      />
    </template>
  </SectionMenu>
</template>

<script>
import SectionMenu from "../SectionMenu.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SectionMenu,
  },
  data() {
    return {
      checkList: [],
    };
  },
  methods: {
    ...mapActions(["UpdateSite"]),
  },
  computed: {
    ...mapGetters(["activeSite", "sites"]),
  },
};
</script>

<style>
</style>
<template>
  <SectionMenu>
    <template #name>Профилемер</template>
    <template #body>
      <el-radio
        :model-value="activeSite"
        :class="[site.parent? 'children':'']"
        v-for="site in sites"
        :key="site.id"
        :label="site.id"
        @change="UpdateSite(site.id)"
        :disabled="activeTab == 'comparison' || !site.data"
      >
        <span
          :style="{borderLeft:`15px solid ${site.color} !important`,paddingLeft:'1em !important'}"
        >{{site.name}}</span>
      </el-radio>
    </template>
  </SectionMenu>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SectionMenu from "../SectionMenu.vue";
export default {
  components: {
    SectionMenu,
  },
  methods: {
    ...mapActions(["UpdateSite"]),
  },
  computed: {
    ...mapGetters(["activeSite", "sites", "activeTab"]),
    /*     list() {
      const sites = [...this.sites];

      const childrens = sites.filter((s) => s.parent);
      const parents = sites.filter((s) => !s.parent);

      childrens.forEach((c) => {
        const parentIndex = parents.findIndex((p) => p.id == c.parent);
        parents[parentIndex].childrens.push(c);
      });

      return sites;
    }, */
  },
};
</script>

<style>
</style>
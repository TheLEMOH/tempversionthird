<template>
  <SectionMenu>
    <template #name>Режим просмотра</template>
    <template #body>
      <el-radio
        :model-value="activeTab"
        :key="tabs[0].id"
        :label="tabs[0].id"
        @click="UpdateTab(tabs[0].id)"
      >{{tabs[0].name}}</el-radio>

      <el-radio
        :model-value="activeSite"
        :class="[site.children? 'children':'post']"
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
      <hr />
      <el-radio
        :model-value="activeTab"
        :key="tabs[1].id"
        :label="tabs[1].id"
        @click="UpdateTab(tabs[1].id)"
      >{{tabs[1].name}}</el-radio>
    </template>
  </SectionMenu>
</template>
<script>
import SectionMenu from "./SectionMenu.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SectionMenu,
  },
  data() {
    return {
      tabs: [
        {
          id: "rawData",
          name: "Один профилемер",
        },
        { id: "comparison", name: "Два профилемера" },
      ],
    };
  },
  methods: {
    ...mapActions(["UpdateTab", "UpdateSite"]),
  },
  computed: {
    ...mapGetters(["activeTab", "activeSite", "sites"]),
  },
};
</script>

<style>
.children {
  margin-left: 3em;
}
.post {
  margin-left: 1.5em;
}
</style>
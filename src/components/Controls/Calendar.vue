<template>
  <SectionMenu>
    <template #name>Календарь</template>
    <template #body>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="-"
        clearable="false"
        start-placeholder="Начальная дата"
        end-placeholder="Конечная дата"
        :shortcuts="shortcuts"
      />
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
      shortcuts: [
        {
          text: "Два дня",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
            return [start, end];
          },
        },
        {
          text: "Неделя",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "Месяц",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
      ],
    };
  },
  methods: { ...mapActions(["UpdateDate"]) },
  computed: {
    ...mapGetters(["dateControl"]),
    date: {
      get() {
        return this.dateControl;
      },
      set(value) {
        this.UpdateDate(value);
      },
    },
  },
};
</script>

<style></style>

<template>
  <el-date-picker
    style="width:300px; flex-grow: 0;margin-left: auto; margin-right: 1em;"
    v-model="date"
    type="daterange"
    range-separator="-"
    :clearable="false"
    :teleported="false"
    start-placeholder="Начальная дата"
    end-placeholder="Конечная дата"
    :shortcuts="shortcuts"
  />
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
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
  methods: { ...mapActions(["UpdateDate", "UpdateX"]) },
  computed: {
    ...mapGetters(["dateControl"]),
    date: {
      get() {
        return this.dateControl;
      },
      set(value) {
        this.UpdateX(null);
        this.UpdateDate(value);
      },
    },
  },
};
</script>

<style>
#app input {
  user-select: none;
}
</style>
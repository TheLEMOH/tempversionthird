<template>
  <el-drawer v-model="modal" size="300px">
    <template #title>
      <strong style="color: black; font-size: 1.4em">Даты поездок</strong>
    </template>
    <div class="list-of-trip">
      <div class="trip-item" v-for="trip in listOfTrip" :key="trip.name">
        <span
          ><b>{{ trip.name }}</b></span
        >
        <div class="trip-date" v-for="(date, index) in trip.dates" :key="index">
          <span>{{ date.split(" ")[0] }}</span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["UpdateListOfTripDisplay"]),
  },
  computed: {
    ...mapGetters(["listOfTripDisplay", "listOfTrip"]),
    modal: {
      get() {
        return this.listOfTripDisplay;
      },
      set(value) {
        this.UpdateListOfTripDisplay(value);
      },
    },
  },
};
</script>

<style>
.list-of-trip {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trip-item {
  display: flex;
  flex-direction: column;
}
.trip-date {
  margin-left: 1rem;
}
</style>

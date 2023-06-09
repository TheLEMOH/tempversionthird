<template>
  <el-drawer v-model="modal" size="300px">
    <template #title>
      <strong style="color: black; font-size: 1.4em">Даты поездок</strong>
    </template>
    <div class="list-of-trip">
      <div class="trip-item" v-for="trip in listOfTrip" :key="trip.name">
        <span
          ><b>{{ trip[0].split(" ")[0] }}</b></span
        >
        <div class="trip-name" v-for="(site, index) in trip[1]" :key="index" @click="Click({ date: trip[0], site: site })">
          <span>{{ site.name }}</span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["UpdateListOfTripDisplay", "ClickUrlTrip"]),
    Click(object) {
      this.ClickUrlTrip(object);
    },
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

.trip-name {
  margin-left: 1rem;
}

.trip-name span {
  text-decoration: underline;
  color: #0000ff;
}

.trip-name span:hover {
  cursor: pointer;
  color: #772233;
}
</style>

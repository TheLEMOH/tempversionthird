<template>
  <div class="controls-wrapper">
    <Name></Name>
    <Calendar></Calendar>
    <CopyUrl></CopyUrl>
    <DrawerButton></DrawerButton>
    <MapButton></MapButton>
    <AboutButton></AboutButton>
  </div>
  <Drawer></Drawer>
  <About></About>
  <MapModal></MapModal>
</template>
<script>
import Name from "./Name.vue";
import Drawer from "./Drawer.vue";
import About from "./About.vue";
import Calendar from "./CalendarCopy.vue";
import DrawerButton from "./DrawerButton.vue";
import CopyUrl from "./CopyUrl.vue";
import AboutButton from "./AboutButton.vue";
import MapButton from "./MapButton.vue";
import MapModal from "./Map/MapModal.vue";
export default {
  components: {
    Name,
    Calendar,
    Drawer,
    About,
    DrawerButton,
    CopyUrl,
    AboutButton,
    MapButton,
    MapModal,
  },
};
</script>

<style>
.control-span {
  font-size: 1.2em !important;
}

.controls-wrapper {
  position: relative;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  border-bottom: 5px solid #055a81;
  padding-left: 0.2em;
  padding-right: 1em;
}
</style>
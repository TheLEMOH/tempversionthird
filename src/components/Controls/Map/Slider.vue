<template><el-slider v-model="value" :step="50" show-stops :min="0" :max="1000" vertical height="400px" style="z-index: 1000" /></template>

<script setup>
import { ref } from "vue";
/* import { useStore } from "vuex"; */

/* const store = useStore(); */
/* const heights = computed(() => store.getters.height); */

const value = ref(null);
</script>

<style></style>

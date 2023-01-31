<template>
  <div class="map-sites-list">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        :style="{borderLeft:`15px solid ${item.color} !important`,paddingLeft:'1em !important'}"
        @click="$emit('clickItem', item)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["items"],
  emits: ["clickItem"],
};
</script>

<style>
.map-sites-list {
  width: 190px;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  z-index: 100;
  border-radius: 10px;
  margin: 1em;
  background: rgb(255, 255, 255, 0.8);
}

.map-sites-list li {
  padding: 0.3em;
  margin: 0.5em;
  transition: all 0.3s;
  border-radius: 0 10px 10px 0;
  color: black;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.map-sites-list li:hover {
  color: #fff;
  background: #409eff;
  cursor: pointer;
}
</style>
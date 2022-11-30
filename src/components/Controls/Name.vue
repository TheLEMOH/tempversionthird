<template>
  <div class="brand">
    <img src="../../assets/logo.png" />
    <p class="brand-name">Данные температурного профилемера</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.brand {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  text-align: left;
  font-weight: bold;
  color: #055a81;
  margin-right: 1em;
}

img {
  height: 70px;
  margin-right: 1em;
}

@media (max-width: 1000px) {
  .brand-name {
    display: none;
  }
}
</style>
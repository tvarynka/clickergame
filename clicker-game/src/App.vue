<template>
  <MainView />
</template>

<script setup>
import MainView from './views/main-view.vue'

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600;700;900&display=swap');

body {
  margin: 0;
}

#app {
  font-family: "Vollkorn SC", serif;
  text-align: center;
  color: #422800;
  height: 100vh;
  width: calc(100vw - 17px);
  user-select: none;
  background-color: #dfd9d3;
}
</style>

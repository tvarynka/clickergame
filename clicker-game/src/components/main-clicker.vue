<template>
  <div class="wrapper">
    <div ref="button" class="main-clicker" @click="animateClickValue">
    </div>
  </div>
</template>

<script setup>
import { defineProps, useTemplateRef } from 'vue';

const props = defineProps({
  clickValue: Number
});

const button = useTemplateRef('button');

function animateClickValue() {
  let clickValueElement = document.createElement('div');
  clickValueElement.textContent = '+' + props.clickValue;
  clickValueElement.classList.add('click-value');
  clickValueElement.style.left = Math.random() * 130 + 'px';
  button.value.append(clickValueElement);
  setTimeout(() => {
    clickValueElement.remove();
  }, 1000);
}
</script>

<style scoped>
  .wrapper {
    height: 200px;
    width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-clicker {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    background-image: url("../assets/images/coin.svg");
    background-repeat: no-repeat;
    background-size: auto;
    transition: width 0.5s, height 0.5s;
  }

  .main-clicker:active {
    width: 180px;
    height: 180px;
    transition: width 0.5s, height 0.5s;
  }
</style>

<style>
.main-clicker {
  position: relative;
}

.click-value {
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  display: block;
  animation-name: myAnimation;
  animation-duration: 2s;
}

@keyframes myAnimation {
  0% {
    opacity: 1;
    bottom: 20px;
    left: random(130);
  }

  100% {
    opacity: 0;
    bottom: 100px;
    left: random(130);
  }
}
</style>

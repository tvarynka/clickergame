<template>
  <div class="wrapper">
    <div ref="button" class="main-clicker" @click="animateClickValue">
      <img src="../assets/images/coin.svg" />
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
  clickValueElement.style.left = Math.random() * 80 + 'px';
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
  }

  .main-clicker:active {
    background-color: #11ab7a;
    width: 110px;
    height: 55px;
    font-size: 14px;
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
    left: 30px;
  }

  100% {
    opacity: 0;
    bottom: 100px;
    left: random(150);
  }
}
</style>

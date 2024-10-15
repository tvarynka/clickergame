<template>
  <div class="wrapper">
    <button ref="button" class="main-clicker" @click="animateClickValue">
      CLICK ME
    </button>
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
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-clicker {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #15d699;
    font-size: 12px;
    position: relative;
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
  from {
    opacity: 1;
    bottom: 20px;
  }

  to {
    opacity: 0;
    bottom: 100px;
  }
}
</style>

<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <v-btn
      class="main-clicker"
      @click="processClick"
    >
      ЗАРОБИТИ
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps, useTemplateRef, defineEmits } from 'vue';

const props = defineProps({
  clickValue: Number
});

const emit = defineEmits(['clicked']);

const wrapper = useTemplateRef('wrapper');

function processClick() {
  emit('clicked');
  animateClickValue();
}

function animateClickValue() {
  let clickValueElement = document.createElement('div');
  clickValueElement.textContent = '+' + props.clickValue;
  clickValueElement.classList.add('click-value');
  clickValueElement.style.left = Math.random() * 400 + 'px';
  wrapper.value.append(clickValueElement);
  setTimeout(() => {
    clickValueElement.remove();
  }, 1000);
}
</script>

<style scoped>
  .wrapper {
    width: 400px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .main-clicker {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: width 0.5s, height 0.5s;
    border-radius: 50%;
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
    bottom: 150px;
    left: random(130);
  }
}
</style>

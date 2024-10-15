<template>
  <div class="wrapper">
    <button class="basic-upgrade" :disabled="!available">
      <div class="name">
        {{ name }}
      </div>
      <div class="right-column">
        <div class="price">
          Вартість: {{ price }}
        </div>
        <div class="amount">
          Куплено: {{ amount }}
        </div>
      </div>
    </button>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  price: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: 'Upgrade name'
  },
  description: {
    type: String,
    default: 'I will do something cool',
  },
  amount: {
    type: Number,
    default: 0
  },
  available: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped>
.wrapper {
  width: 250px;
  height: 50px;
  position: relative;
}

.basic-upgrade {
  display: flex;
  justify-content: space-between;
  width: 250px;
  height: 50px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.basic-upgrade.available {
  cursor: pointer;
}

.description {
  display: none;
  position: absolute;
  right: 250px;
  top: 10px;
  width: 200px;
  padding: 10px;
  border: 1px solid;
  z-index: 2;
  background-color: white;
}

.wrapper:hover .description {
  display: block;
}
</style>
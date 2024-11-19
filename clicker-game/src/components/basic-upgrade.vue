<template>
  <div
    v-if="!isHidden"
    class="wrapper"
  >
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
  <div
    v-else
    class="wrapper"
  >
    <button class="basic-upgrade" disabled>
      <div class="name">
        ???
      </div>
      <div class="right-column">
        <div class="price">
          Вартість: ???
        </div>
      </div>
    </button>
    <div class="description">
      ???
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
  },
  isHidden: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.wrapper {
  width: 350px;
  position: relative;
}

.basic-upgrade {
  font-family: "Vollkorn SC", serif;
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 70px;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.basic-upgrade:disabled {
  cursor: auto;
}

.description {
  display: none;
  position: absolute;
  right: 100%;
  top: 10px;
  width: 200px;
  padding: 10px;
  border: 1px solid;
  z-index: 2;
  background-color: white;
  margin-right: 10px;
}

.wrapper:hover .description {
  display: block;
}
</style>
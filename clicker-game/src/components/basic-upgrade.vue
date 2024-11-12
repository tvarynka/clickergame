<template>
  <div
    v-if="true || !isHidden"
    class="wrapper"
  >
    <button class="basic-upgrade" :disabled="!available">
      <div class="left-column">
        <div class="image-wrapper">
          <img
            v-if="upgrade.image"
            class="image"
            :src="require(`@/assets/images/upgrades/${upgrade.image}`)"
          />
        </div>
        <div class="name">
          {{ upgrade.name }}
        </div>
      </div>
      <div class="right-column">
        <div class="price">
          Вартість: {{ upgrade.price }}
        </div>
        <div class="amount">
          Куплено: {{ upgrade.amount }}
        </div>
      </div>
    </button>
    <div class="description">
      {{ upgrade.description }}
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
  upgrade: {
    type: Object,
  },
  available: {
    type: Boolean,
    default: false,
  },
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

.image-wrapper {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.image {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.left-column {
  display: flex;
}
</style>
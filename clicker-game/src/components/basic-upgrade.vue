<template>
  <div
    v-if="true || !isHidden"
    class="wrapper"
  >
    <button v-if="true || !isHidden" class="basic-upgrade" :disabled="!available">
      <div class="content-wrapper">
        <div class="left-column">
          <div class="image-wrapper">
            <img
              v-if="upgrade.image"
              class="image"
              :src="require(`@/assets/images/upgrades/${upgrade.image}`)"
            />
          </div>
          <div class="name">
            <div>
              {{ upgrade.name }}
            </div>
            <div>
              {{ description }}
            </div>
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
      </div>
    </button>
    <div class="description">
      {{ tooltipText }}
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
import { defineProps, computed } from 'vue';

const props = defineProps({
  upgrade: {
    type: Object,
  },
  available: {
    type: Boolean,
    default: false,
  },
});

const description = computed(() => `Монет за ${props.upgrade.type === 'manual' ? 'клік' : 'секунду'}: ${props.upgrade.amount * props.upgrade.multiplier}`);

const tooltipText = computed(() => `${props.upgrade.description}. Збільшує дохід за ${props.upgrade.type === 'manual' ? 'клік' : 'секунду'} на ${props.upgrade.multiplier}`);
</script>

<style scoped>
.wrapper {
  width: 350px;
  margin-bottom: 1px;
  position: relative;
}

.basic-upgrade {
  font-family: "Vollkorn SC", serif;
  width: 345px;
  height: 70px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  background-color: #fbeee0;
  border-radius: 5px;
  border: 2px solid #000000;
  padding: 2px;
}

.content-wrapper {
  border: 2px solid #a76504;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 3px;
}

.basic-upgrade:disabled {
  cursor: auto;
  opacity: 0.5;
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

.name {
  text-align: left;
}
</style>
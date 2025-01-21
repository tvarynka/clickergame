<template>
  <div
    v-if="!isHidden"
    class="wrapper"
    @click="processClick"
    @mouseenter="processMouseOver"
    @mouseleave="processMouseleave"
  >
    <button class="basic-upgrade" :disabled="!available">
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
            Вартість: {{ price }}
          </div>
          <div class="amount">
            Куплено: {{ props.amount }}
          </div>
        </div>
      </div>
    </button>
  </div>
  <div
    v-else
    class="wrapper"
    @mouseenter="processMouseOver"
    @mouseleave="processMouseleave"
  >
    <button class="basic-upgrade" disabled>
      <div class="content-wrapper">
        <div class="left-column">
          <div class="image-wrapper"></div>
          <div class="name-hidden">
            ???
          </div>
        </div>
        <div class="right-column">
          <div class="price">
            Вартість: ???
          </div>
        </div>
      </div>
    </button>
  </div>

  <div class="description" ref="descriptionElement">
    {{ tooltipText }}
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  upgrade: {
    type: Object,
  },
  amount: {
    type: Number
  }
});

const emit = defineEmits(['update']);

const description = computed(() => `Монет за ${props.upgrade.type === 'manual' ? 'клік' : 'секунду'}: ${props.amount * props.upgrade.multiplier}`);

const tooltipText = computed(() => `${props.upgrade.description}. Збільшує дохід за ${props.upgrade.type === 'manual' ? 'клік' : 'секунду'} на ${props.upgrade.multiplier}`);

const available = computed(() => store.state.bank >= props.upgrade.price);

const isHidden = computed(() => store.state.totalBank < props.upgrade.price);

const price = computed(() => Math.round(props.upgrade.price * (props.amount === 0 ? 1 : props.amount * 1.1245563)));

const descriptionElement = ref();

function processClick() {
  if (price.value > store.state.bank) {
    return;
  }

  store.dispatch('decreaseBank', price.value);

  emit('update', props.upgrade.name)
}

function processMouseOver(e) {
  descriptionElement.value.style.display = 'block';
  descriptionElement.value.style.top = e.target.getBoundingClientRect().y + 'px';
  descriptionElement.value.style.right = '355px';
}

function processMouseleave() {
  descriptionElement.value.style.display = 'none';
}
</script>

<style scoped>
.wrapper {
  margin-bottom: 1px;
}

.basic-upgrade {
  font-family: "Vollkorn SC", serif;
  width: 100%;
  height: 70px;
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
  width: 300px;
  padding: 10px;
  border: 1px solid;
  z-index: 2;
  background-color: white;
  margin-right: 10px;
  font-size: 13px;
}

.image-wrapper {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.name-hidden {
  display: flex;
  align-items: center;
}
</style>
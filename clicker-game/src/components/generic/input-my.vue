<template>
  <div class="input-wrapper">
    <label class="label">{{ label }}</label>
    <input
      class="input"
      :class="{'errored': isErrored}"
      :type="type"
      v-model="inputValue"
      @blur="validate"
    />
    <div v-if="isErrored" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineModel } from 'vue';

const props = defineProps({
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
  errorMessage: {
    type: String,
    default: "Field is required"
  },
  type: {
    type: String,
    default: 'text'
  }
});

const inputValue = defineModel();

const isErrored = ref(false);

function validate() {
  if (props.required) {
    isErrored.value = inputValue.value === '' || inputValue.value === undefined;
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}

.errored {
  border-color: red;
}

.label {
  display: block;
}

.input-wrapper {
  margin-bottom: 15px;
}
</style>
<template>
  <div class="log-in">
    <InputMy v-model="email" :label="'Email'" :required="true" />
    <InputMy v-model="password" :label="'Password'" :required="true" :type="'password'" />
    <div>
      <button
        @click="login"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import InputMy from '../generic/input-my.vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

const emit = defineEmits(['logged-in']);

async function login() {
  try {
    await axios.post("http://localhost:5000/auth/login", {
      email: email.value,
      password: password.value,
    });

    emit('logged-in');
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
  }
}
</script>

<style lang="css" scoped>
.log-in {
  text-align: left;
  padding: 20px;
}
</style>
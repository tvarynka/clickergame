<template>
  <div v-if="isLoggedIn">
    Logged in
  </div>
  <div v-else>
    <UserLogin v-if="isRegistered" @logged-in="loggedIn" />
    <UserRegister v-else @registered="isRegistered = true" />

    <div v-if="isRegistered">
      Немає аккаунту? <span class="switch-text" @click="isRegistered = false">Зареєструватися</span>
    </div>
    <div v-else>
      Вже є аккаунт? <span class="switch-text" @click="isRegistered = true">Залогуватися</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import UserLogin from './user-login.vue';
import UserRegister from './user-register.vue';

const isLoggedIn = ref(false);
const isRegistered = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5001/users/profile", {
      withCredentials: true, // Include cookies
    });

    console.log("User Profile:", response.data);
    isLoggedIn.value = true;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
  }
});

function loggedIn() {
  isLoggedIn.value = true;
}
</script>

<style scoped>
.switch-text {
  cursor: pointer;
  text-decoration: underline;
}
</style>

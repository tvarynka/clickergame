<template>
  <div v-if="isLoggedIn">
    Logged in
  </div>
  <div v-else>
    <UserLogin @logged-in="loggedIn" />
    <UserRegister />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import UserLogin from './user-login.vue';
import UserRegister from './user-register.vue';

const isLoggedIn = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5000/users/profile", {
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
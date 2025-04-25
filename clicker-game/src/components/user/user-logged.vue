<template>
  <h3>
    Hello, 
  </h3>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5001/users/profile", {
      withCredentials: true, // Include cookies
    });

    console.log("User Profile:", response.data);
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
  }
});
</script>
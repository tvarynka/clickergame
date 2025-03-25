<template>
  <div class="log-in">
    <h3 class="header">
      Залогуватися
    </h3>

    <v-form v-model="isValid">
      <v-text-field
        v-model="email"
        class="input"
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        density="compact"
        :rules="[rules.required, rules.email]"
      >
      </v-text-field>

      <v-text-field
        v-model="password"
        class="input"
        label="Пароль"
        type="password"
        density="compact"
        :rules="[rules.required]"
      >
      </v-text-field>
    </v-form>

      <v-btn
        class="button"
        :disabled="!isValid"
        variant="tonal"
        @click="login"
      >
        УВІЙТИ
      </v-btn>

    <div v-if="failedLogin">
      Не вдалось увійти. Перевірте чи правильно введено пошту та пароль.
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import rules from '@/utils/validation-rules';

const email = ref('');
const password = ref('');

const isValid = ref(true);

const failedLogin = ref(false);

const emit = defineEmits(['logged-in']);

async function login() {
  try {
    await axios.post("http://localhost:5001/auth/login", {
      email: email.value,
      password: password.value,
    });

    emit('logged-in');
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);

    failedLogin.value = true;
  }
}
</script>

<style lang="css" scoped>
.log-in {
  padding: 20px;
}

.input {
  margin-bottom: 10px;
}

.header, .button {
  margin-bottom: 20px;
}
</style>
<template>
  <div class="register">
    <h3 class="header">
      Реєстрація
    </h3>

    <v-form v-model="isValid">
      <v-text-field
        v-model="username"
        class="input"
        label="Ім'я користувача"
        density="compact"
        :rules="[rules.required, rules.minLength(2)]"
      >
      </v-text-field>

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
        :rules="[rules.required, rules.minLength(8), rules.uppercase, rules.lowercase, rules.specialSymbol]"
      >
      </v-text-field>

      <v-text-field
        v-model="passwordCopy"
        class="input"
        label="Повторіть пароль"
        type="password"
        density="compact"
        :rules="[rules.required, rules.isEqualTo(password, 'Значення паролів має бути однаковим')]"
      >
      </v-text-field>
    </v-form>

    <v-btn
      class="button"
      variant="tonal"
      :disabled="!isValid"
      @click="register"
    >
      ЗАРЕЄСТРУВАТИСЯ
    </v-btn>

    <div v-if="failedRegister">
      Не вдалось зареєструватись. Спробуйте пізніше.
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import rules from '@/utils/validation-rules';
import axios from 'axios';

const username =  ref('');
const email =  ref('');
const password =  ref('');
const passwordCopy =  ref('');

const isValid = ref(true);
const failedRegister = ref(false);

const emit = defineEmits(['registered']);

async function register() {
  try {
    await axios.post("http://localhost:5001/auth/register", {
      email: email.value,
      password: password.value,
      username: username.value,
    });

    emit('registered');
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    failedRegister.value = true;
  }
}
</script>

<style scoped>
.register {
  padding: 20px;
}

.input {
  margin-bottom: 10px;
}

.header, .button {
  margin-bottom: 20px;
}
</style>
<template>
  <div class="login p-d-flex p-jc-center p-ai-center" style="height: 100vh;">
    <Toast />
    <div class="p-card" style="width: 25rem;">
      <h2 class="p-text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="p-fluid">
        <div class="p-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" required />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <Password id="password" v-model="password" :feedback="false" toggleMask required />
        </div>
        <Button type="submit" label="Login" :loading="loading" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const username = ref('');
const password = ref('');
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Login Failed', detail: error.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>
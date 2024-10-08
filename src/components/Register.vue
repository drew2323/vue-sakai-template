<template>
    <div class="register p-d-flex p-jc-center p-ai-center" style="height: 100vh;">
      <Toast />
      <div class="p-card" style="width: 25rem;">
        <h2 class="p-text-center">Register</h2>
        <form @submit.prevent="handleRegister" class="p-fluid">
          <div class="p-field">
            <label for="username">Username</label>
            <InputText id="username" v-model="username" required />
          </div>
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" type="email" required />
          </div>
          <div class="p-field">
            <label for="fullName">Full Name</label>
            <InputText id="fullName" v-model="fullName" />
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <Password id="password" v-model="password" required />
          </div>
          <Button type="submit" label="Register" :loading="loading" />
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../store/auth';
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
  const email = ref('');
  const fullName = ref('');
  const password = ref('');
  const loading = ref(false);
  
  const handleRegister = async () => {
    loading.value = true;
    try {
      await authStore.register(username.value, password.value, email.value, fullName.value);
      router.push('/');
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Registration Failed', detail: error.message, life: 3000 });
    } finally {
      loading.value = false;
    }
  };
  </script>
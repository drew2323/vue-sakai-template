// src/composables/useFetchData.js
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useConfirm } from 'primevue/useconfirm';

export function useAuthUtils() {
  const authStore = useAuthStore();
  const confirm = useConfirm();

  const confirmLogout = () => {
    confirm.require({
      message: 'Are you sure you want to logout?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        authStore.logout();
        //router.push('/auth/login');
      },
    });
  };

  return {
    confirmLogout
  };
}


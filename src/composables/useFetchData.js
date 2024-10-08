// src/composables/useFetchData.js
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import ToastEventBus from 'primevue/toasteventbus';

// Set the base URL globally
axios.defaults.baseURL = 'http://localhost:8000';

export function useFetchData() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const authStore = useAuthStore();
  const toast = {
    add: (message) => ToastEventBus.emit('add', message),
    removeGroup: (group) => ToastEventBus.emit('remove-group', group),
    removeAllGroups: () => ToastEventBus.emit('remove-all-groups'),
  };

  const fetchData = async (url, options = {}) => {
    loading.value = true;
    error.value = null;
    data.value = null;

    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        data: options.data,
        params: options.params,
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
          ...options.headers
        }
      });
    
      data.value = response.data;
    } catch (err) {
      error.value = err;
      console.error('Error fetching data:', err);
      if (!options.silent) {
      // Handle different types of errors
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (err.response.status) {
          case 401:
            toast.add({ severity: 'error', summary: 'Unauthorized', detail: 'Please log in again.', life: 3000 });
            // Optionally, you can redirect to login page or refresh the token
            break;
          case 403:
            toast.add({ severity: 'error', summary: 'Forbidden', detail: 'You don\'t have permission to access this resource.', life: 3000 });
            break;
          case 404:
            //toast.add({ severity: 'error', summary: 'Not Found', detail: 'The requested resource was not found.', life: 3000 });
            break;
          default:
            toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching data.', life: 3000 });
        }
      } else if (err.request) {
        // The request was made but no response was received
        toast.add({ severity: 'error', summary: 'Network Error', detail: 'Please check your internet connection.', life: 3000 });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred.', life: 3000 });
      }
    }
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData
  };
}
// src/composables/useFetchDataSilent.js
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/auth';

// Set the base URL globally
axios.defaults.baseURL = 'http://localhost:8000';

export function useFetchDataSilent() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const authStore = useAuthStore();

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
      // Here, we're not using toast notifications
      // You can handle errors differently if needed
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
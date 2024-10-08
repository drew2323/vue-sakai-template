// src/store/auth.js
import { defineStore } from 'pinia';
import { useFetchData } from '../composables/useFetchData';
import { useFetchDataSilent } from '@/composables/useFetchDataSilent';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null, // Load token from localStorage on init
    tenants: [],
    currentTenant: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isSuperuser: (state) => state.user?.app_role === 'superuser',
    currentTenantRole: (state) => {
      if (!state.currentTenant || !state.user) return null;
        return state.currentTenant.role;
    },
  },
  actions: {
    async login(username, password) {
      const { data, error, fetchData } = useFetchData();
      await fetchData('/api/auth/login', {
        method: 'POST',
        data: new URLSearchParams({
            username: username,
            password: password
          }),
        headers: [{ 'Content-Type': 'application/x-www-form-urlencoded' }]
      });
      if (error.value) throw error.value;
      this.token = data.value.access_token;
      localStorage.setItem('token', this.token); // Persist token to localStorage
      await this.fetchUser();
      //await this.fetchTenants();
    },
    async register(username, password, email, fullName) {
      const { data, error, fetchData } = useFetchData();
      await fetchData('/api/auth/register', {
        method: 'POST',
        data: { username, password, email, full_name: fullName },
      });
      if (error.value) throw error.value;
      this.token = data.value.access_token;
      await this.fetchUser();
      //await this.fetchTenants();
    },
    async fetchUser(options) {
        let data, error, fetchData;
      
        if (options && options.silent) {
          ({ data, error, fetchData } = useFetchDataSilent());
        } else {
          ({ data, error, fetchData } = useFetchData());
        }
      
        await fetchData('/api/auth/user');
        
        if (error.value) throw error.value;
        
        this.user = data.value;
        this.currentTenant = this.user.tenant_access[0]; // save locally
        this.tenants = this.user.tenant_access;
      },
    async fetchTenants() {
      const { data, error, fetchData } = useFetchData();
      await fetchData('/api/user/tenants');
      if (error.value) throw error.value;
      this.tenants = data.value;
      if (this.tenants.length > 0) {
        this.currentTenant = this.tenants[0];
      }
    },
    setCurrentTenant(tenant) {
      this.currentTenant = tenant;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.tenants = [];
      this.currentTenant = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    // Add this method to be called on app initialization
    async initAuth() {
        if (this.token) {
          try {
            await this.fetchUser({silent: true});  // Re-fetch user data if token exists
            //await this.fetchTenants();  // Re-fetch tenants
          } catch (error) {
            this.logout();  // If token is invalid, logout
          }
        }
      },
  },
});

//You can implement silent refresh if the token expires while the user is still logged in.
//Store token expiration time in localStorage and check before making requests to refresh the token if it's expired.
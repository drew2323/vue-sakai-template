// src/components/Dashboard.vue
<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <p>Welcome, {{ user.full_name || user.username }}!</p>
    <p>Current Tenant: {{ currentTenant ? currentTenant.name : 'None selected' }}</p>
    <Button label="Logout" icon="pi pi-sign-out" @click="confirmLogout" />
    <Button label="Change Tenant" icon="pi pi-users" @click="$router.push('/select-tenant')" class="p-ml-2" />
    
    <div v-if="tenantData">
      <h3>Tenant Data</h3>
      <DataTable :value="tenantData" :paginator="true" :rows="10">
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { useFetchData } from '../composables/useFetchData';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const authStore = useAuthStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const { data: tenantData, loading, error, fetchData } = useFetchData();
const columns = ref([]);

const user = computed(() => authStore.user);
const currentTenant = computed(() => authStore.currentTenant);

const confirmLogout = () => {
  confirm.require({
    message: 'Are you sure you want to logout?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      authStore.logout();
      router.push('/auth/login');
    },
  });
};

const fetchTenantData = async () => {
  if (currentTenant.value) {
    await fetchData(`/api/tenant/${currentTenant.value.id}/data`);
    if (tenantData.value && tenantData.value.length > 0) {
      columns.value = Object.keys(tenantData.value[0]).map(key => ({ field: key, header: key }));
    }
  }
};

onMounted(fetchTenantData);
</script>

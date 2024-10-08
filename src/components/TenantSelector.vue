<template>
    <div class="tenant-selector">
      <Toast />
      <h2>Select Tenant</h2>
      <DataTable :value="tenants" :paginator="true" :rows="10">
        <Column field="name" header="Tenant Name"></Column>
        <Column header="Action">
          <template #body="slotProps">
            <Button label="Select" icon="pi pi-check" @click="selectTenant(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAuthStore } from '../store/auth';
  import { useRouter } from 'vue-router';
  import { useToast } from 'primevue/usetoast';
  import Toast from 'primevue/toast';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  
  const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();
  
  const tenants = computed(() => authStore.tenants);
  
  const selectTenant = (tenant) => {
    authStore.setCurrentTenant(tenant);
    toast.add({ severity: 'success', summary: 'Tenant Selected', detail: `Switched to ${tenant.name}`, life: 3000 });
    router.push('/');
  };
  </script>
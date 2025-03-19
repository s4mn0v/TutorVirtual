<template>
  <ClientOnly>
    <UButton class="cursor-pointer text-white" icon="i-heroicons-arrow-left-circle" size="md" color="error"
      :ui="{ rounded: 'rounded-full' }" variant="solid" @click="logout" 
      />
  </ClientOnly>
</template>

<script setup>
import { useSupabaseClient } from '#imports';
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  return Promise.resolve(navigateTo("/login")); // Redirigir al login
};
</script>
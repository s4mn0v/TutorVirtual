<script setup lang="ts">
definePageMeta({
  middleware: "auth", // Aplica el middleware
});

import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  return navigateTo("/login"); // Redirigir al login
};


</script>

<template>
  <div>
    <h1>Bienvenido al Dashboard</h1>
    <p>Solo puedes ver esto si estás autenticado.</p>
    <button @click="logout" class="p-2 bg-red-500 text-white rounded">Cerrar Sesión</button>
  </div>
</template>

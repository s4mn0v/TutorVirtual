<script setup lang="ts">
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref("");

const login = async () => {
  errorMsg.value = "";
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  return navigateTo("/about"); // Redirigir a dashboard después del login
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo" required class="p-2 border rounded w-full mb-2" />
      <input v-model="password" type="password" placeholder="Contraseña" required
        class="p-2 border rounded w-full mb-2" />
      <button type="submit" class="p-2 bg-green-500 text-white rounded w-full">Ingresar</button>
      <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<template>
  <ClientOnly>
    <div v-if="mounted" class="p-4">
      <h1 class="text-2xl font-bold mb-4">Registro</h1>

      <UForm :state="{ email, password }" @submit="register">
        <input v-model="email" type="email" name="email" autocomplete="email" placeholder="Correo" required
          class="p-2 border rounded w-full mb-2" />

        <input v-model="password" type="password" name="password" autocomplete="new-password" placeholder="Contraseña"
          required class="p-2 border rounded w-full mb-2" />

        <UButton type="submit" color="primary" block :loading="loading">
          Registrarse
        </UButton>

        <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
      </UForm>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useSupabaseClient } from '#imports';

const supabase = useSupabaseClient<Database>();
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const mounted = ref(false);
const loading = ref(false);

onMounted(() => {
  mounted.value = true;
});

async function register() {
  errorMsg.value = '';
  loading.value = true;

  try {
    const { data: userData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/confirmation`,
      }
    });

    if (authError) throw authError;

    alert("Revisa tu correo para confirmar tu cuenta.");
    await navigateTo('/check-email');

  } catch (error: any) {
    errorMsg.value = error.message || 'Error en el registro';
    console.error('Detailed error:', error);
  } finally {
    loading.value = false;
  }
}
</script>

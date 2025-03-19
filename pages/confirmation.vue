<template>
  <div class="p-4 text-center">
    <h1 class="text-2xl font-bold">Confirmando tu cuenta...</h1>
    <p v-if="loading">Verificando...</p>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSupabaseClient } from '#imports';

const router = useRouter();
const supabase = useSupabaseClient();
const loading = ref(true);
const errorMsg = ref('');

async function verifyUser() {
  try {
    // Obtener el usuario autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Usuario no autenticado.');

    // Verificar si el perfil existe
    const { data: profileExists } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!profileExists) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          role: 'student',
          created_at: new Date().toISOString()
        }]);

      if (profileError) throw profileError;
    }

    router.push('/login');
  } catch (error) {
    errorMsg.value = error.message || 'Error al confirmar la cuenta';
    console.error('Error en confirmación:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(verifyUser);
</script>

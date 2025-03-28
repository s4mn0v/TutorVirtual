<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
    <!-- Formulario -->
    <div class="bg-gray-900 p-8 rounded-2xl shadow-lg w-96 relative z-10 neon-border">
      <h2 class="text-white text-2xl font-semibold text-center mb-4">Registro</h2>

      <ClientOnly>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="email">Correo</label>
            <input v-model="email" type="email" id="email"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="password">Contraseña</label>
            <input v-model="password" type="password" id="password"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="name">Nombre</label>
            <input v-model="name" type="text" id="name"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="last_name">Apellido</label>
            <input v-model="last_name" type="text" id="last_name"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="document_id">Documento de identidad</label>
            <input v-model="document_id" type="text" id="document_id"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="career">Carrera</label>
            <select v-model="career" id="career"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required>
              <option value="" disabled>Selecciona una carrera</option>
              <option value="Ing. Software">Ing. Software</option>
              <option value="Ing. Sistemas">Ing. Sistemas</option>
              <option value="Psicologia">Psicologia</option>
            </select>
          </div>

          <button type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-2 rounded-md transition"
            :disabled="loading">
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>
      </ClientOnly>

      <p v-if="errorMsg" class="text-red-500 mt-2 text-center">{{ errorMsg }}</p>
      <p class="mt-4 text-gray-400 text-center">¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-indigo-500">Inicia sesión aquí</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSupabaseClient } from "#imports";
import { ClientOnly } from '#components';

const supabase = useSupabaseClient();
const email = ref('');
const password = ref('');
const name = ref('');
const last_name = ref('');
const document_id = ref('');
const career = ref('');
const errorMsg = ref('');
const loading = ref(false);

async function register() {
  errorMsg.value = '';
  loading.value = true;

  try {
    // 1. Auth
    const { data: { user }, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    });

    if (error) throw error;

    // 2. Register user in table students
    const { error: insertError } = await supabase
      .from('students')
      .insert({
        id: user.id, // UUID
        name: name.value,
        last_name: last_name.value,
        document_id: document_id.value,
        career: career.value
      });

    if (insertError) throw insertError;

    alert("¡Registro exitoso!");
    await navigateTo('/login');

  } catch (error) {
    errorMsg.value = error.message || 'Error en el registro';
  } finally {
    loading.value = false;
  }
}
</script>

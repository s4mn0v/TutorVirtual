<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-center">Confirma tu cuenta</h1>

    <p v-if="loading" class="text-center">Verificando...</p>
    <p v-if="errorMsg" class="text-red-500 text-center">{{ errorMsg }}</p>

    <div v-if="!loading && !errorMsg" class="mt-4">
      <h2 class="text-xl font-bold mb-2 text-center">Completa tus datos</h2>

      <UForm :state="{ last_name, document_id, career }" @submit="saveStudentData">
        <input v-model="last_name" type="text" name="last_name" placeholder="Apellido" required
          class="p-2 border rounded w-full mb-2" />

        <input v-model="document_id" type="text" name="document_id" placeholder="Documento de identidad" required
          class="p-2 border rounded w-full mb-2" />

        <input v-model="career" type="text" name="career" placeholder="Carrera" required
          class="p-2 border rounded w-full mb-2" />

        <UButton type="submit" color="primary" block :loading="saving">
          Guardar Datos
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSupabaseClient } from "#imports";

const router = useRouter();
const supabase = useSupabaseClient();
const loading = ref(true);
const saving = ref(false);
const errorMsg = ref("");

// Datos del estudiante
const last_name = ref("");
const document_id = ref("");
const career = ref("");

async function verifyUser() {
  try {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) throw new Error("Error al verificar usuario");

    loading.value = false;
  } catch (error) {
    errorMsg.value = error.message || "Error en la verificación";
  }
}

async function saveStudentData() {
  saving.value = true;

  try {
    await $fetch("/api/confirmations", {
      method: "POST",
      body: {
        last_name: last_name.value,
        document_id: document_id.value,
        career: career.value,
      },
    });

    alert("Datos guardados con éxito.");
    router.push("/login");
  } catch (error) {
    errorMsg.value = error.data?.statusMessage || "Error al guardar datos";
  } finally {
    saving.value = false;
  }
}

onMounted(verifyUser);
</script>

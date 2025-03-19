<template>
  <div class="p-4 text-center">
    <h1 class="text-2xl font-bold">Confirmando tu cuenta...</h1>
    <p v-if="loading">Verificando...</p>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
const router = useRouter();
const loading = ref(true);
const errorMsg = ref("");

async function verifyUser() {
  try {
    await $fetch("/api/confirmations", {
      method: "POST",
    });
    router.push("/login");
  } catch (error) {
    errorMsg.value = error.data?.statusMessage || error.message;
  } finally {
    loading.value = false;
  }
}

onMounted(verifyUser);
</script>

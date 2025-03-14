<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <UCard v-for="subject in subjects" :key="subject.code" class="hover:shadow-lg transition-shadow hover:cursor-pointer dark:hover:shadow-lg dark:hover:shadow-white">
      <template #header>
        <div class="flex justify-between">
          <h2 class="text-xl font-semibold">{{ subject.name }}</h2>
          <p class="text-lg tracking-widest">{{ subject.code }}</p>
        </div>
      </template>

      <div class="space-y-2">
        <p><strong>Jornada:</strong> <strong class="text-green-500">{{ subject.journey }}</strong></p>
        <p><strong>Docente:</strong> {{ subject.teacher }}</p>
        <p><strong>Vencimiento:</strong> <strong class="text-red-500">{{ subject.expires }}</strong></p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const props = defineProps({
  subjects: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
<template>
  <div class="min-h-screenp-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Calendario del Estudiante</h1>
      <div class="bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
        <StudentCalendar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from '~/components/student/StudentCalendar.vue'
</script>
<template>
  <div>
    <!-- Contenedor flexible para alinear el título y los enlaces -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Calendario y Recordatorios</h1>
    </div>

    <!-- Usar el componente calendar_reminders -->
    <CalendarReminders />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'studentoverview',
  middleware: "role",
  roles: ["student"],
});
</script>
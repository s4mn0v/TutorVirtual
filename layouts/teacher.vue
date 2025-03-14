<template>
  <TeacherSidebar>
    <!-- Contenido al lado del sidebar -->
    <slot />
  </TeacherSidebar>
</template>

<script setup>
import TeacherSidebar from '~/components/dashboard/Teacher/TeacherLinks.vue';
</script>

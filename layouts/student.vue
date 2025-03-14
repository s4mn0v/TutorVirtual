<template>
  <StudentSidebar>
    <!-- Contenido al lado del sidebar -->
    <slot />
  </StudentSidebar>
</template>

<script setup>
import StudentSidebar from '~/components/dashboard/Student/StudentLinks.vue';
</script>

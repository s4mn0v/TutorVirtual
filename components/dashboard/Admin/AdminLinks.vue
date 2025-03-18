<template>
  <CommonSidebar :links="adminLinks">
      <slot />
  </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const adminLinks = [
  { to: '/admin', label: 'Noticias', icon: 'heroicons-outline:newspaper' },
  { to: '/admin/teachers', label: 'Docentes', icon: 'heroicons-outline:academic-cap' },
  { to: '/admin/students', label: 'Estudiantes', icon: 'heroicons-outline:user-group' },
  { to: '/admin/statistics', label: 'Estadísticas', icon: 'heroicons-outline:chart-bar' },
];
</script>
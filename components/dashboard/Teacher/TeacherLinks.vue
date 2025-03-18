<template>
    <CommonSidebar :links="teacherLinks">
      <slot />
    </CommonSidebar>
  </template>
  
  <script setup>
  import CommonSidebar from '@/components/common/Sidebar.vue';
  
  const teacherLinks = [
    { to: '/teacher/', label: 'Noticias', icon: 'heroicons-outline:newspaper' },
    { to: '/teacher/subjects', label: 'Asignaturas', icon: 'heroicons-outline:book-open' },
    { to: '/teacher/statistics', label: 'Estadisticas', icon: 'heroicons-outline:chart-bar' },
  ];
  </script>
  
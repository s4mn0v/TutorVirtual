<template>
    <CommonSidebar :links="waitingarea">
      <slot />
    </CommonSidebar>
  </template>
  
  <script setup>
  import CommonSidebar from '@/components/common/Sidebar.vue';
  
  const waitingarea = [
    { to: '/student/', label: 'Noticias', icon: 'heroicons:rss' },
    { to: '/student/subjectsview', label: 'Asignaturas', icon: 'heroicons-outline:book-open' },
  ];
  </script>
  
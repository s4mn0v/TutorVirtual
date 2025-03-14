<template>
  <CommonSidebar :links="studentLinks">
    <slot />
  </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const studentLinks = [
  { to: '/student/', label: 'Noticias', icon: 'mdi:rss' },
  { to: '/student/subjects', label: 'Asignaturas', icon: 'mdi:book-open-variant-outline' },
  { to: '/student/calendar', label: 'Calendario', icon: 'mdi:calendar' },
];
</script>

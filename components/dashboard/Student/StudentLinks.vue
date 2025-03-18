<template>
  <CommonSidebar :links="studentLinks">
    <slot />
  </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const studentLinks = [
  { to: '/student/newsoverv ', label: 'Noticias', icon: 'heroicons-outline:rss' },
  { to: '/student/virtualtutor', label: 'Tutor Virtual', icon: 'heroicons-outline:book-open' },
  { to: '/student/calendar', label: 'Calendario', icon: 'heroicons-outline:calendar' },
  { to: '/student/studymaterial', label: 'Material de Estudio', icon: 'heroicons-outline:document-text' }, // Changed icon here
];
</script>

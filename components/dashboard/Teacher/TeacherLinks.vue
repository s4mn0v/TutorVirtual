<template>
  <CommonSidebar :links="studentLinks">
    <slot />
  </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const studentLinks = [
  { to: '/student/Asignaturas', label: 'Dashboard', icon: 'mdi:view-dashboard' },
];
</script>

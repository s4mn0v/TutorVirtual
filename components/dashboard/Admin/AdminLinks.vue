<template>
  <CommonSidebar :links="studentLinks">
    <slot />
  </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const studentLinks = [
  { to: '/student/Asignaturas', label: 'Dashboard', icon: 'mdi:view-dashboard' },
  {
    label: 'More',
    icon: 'mdi:cog',
    children: [
      { to: '/student/profile', label: 'Profile', icon: 'mdi:account' },
      { to: '/student/settings', label: 'Settings', icon: 'mdi:cog-outline' }
    ]
  }
];
</script>

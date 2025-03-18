<template>
    <CommonSidebar :links="superAdminLinks">
        <slot />
    </CommonSidebar>
</template>

<script setup>
import CommonSidebar from '@/components/common/Sidebar.vue';

const superAdminLinks = [
  { to: '/superadmin', label: 'Noticias', icon: 'heroicons-outline:newspaper' },
  { to: '/superadmin/management/admins', label: 'Administradores', icon: 'heroicons-outline:user-group' },
  { to: '/superadmin/management/teachers', label: 'Docentes', icon: 'heroicons-outline:academic-cap' },
  { to: '/superadmin/management/students', label: 'Estudiantes', icon: 'heroicons-outline:user-group' },
  { to: '/superadmin/statistics', label: 'Estadísticas', icon: 'heroicons-outline:chart-bar' },
];
</script>

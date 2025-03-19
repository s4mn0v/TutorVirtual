<script setup lang="ts">
definePageMeta({
  middleware: "role",
  roles: ["admin"], // Solo superadmin puede acceder
  layout: "admin"
});
</script>

<template>
  <div>
    <h1>Panel de admin</h1>
  </div>
</template>

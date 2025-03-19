<template>
  <h1>Estadisticas</h1>
  <Paragraph />
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: "role",
  roles: ["admin"],
})
</script>
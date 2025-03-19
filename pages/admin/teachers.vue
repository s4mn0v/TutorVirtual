<template>
  <h1>Docentes</h1>
  <Forms />
  <Table />
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: "role",
  roles: ["admin"],
})
</script>
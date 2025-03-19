<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Tutor Virtual</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'studentoverview',
  middleware: "role",
  roles: ["student"],
})
</script>
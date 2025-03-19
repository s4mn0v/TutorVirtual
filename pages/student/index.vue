<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Noticias</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'studentwaiting',
  middleware: "role",
  roles: ["student"],
})
</script>
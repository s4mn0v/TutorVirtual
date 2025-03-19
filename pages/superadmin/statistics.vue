<template>
    <h1>Estadísticas</h1>
    <Paragraph />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: "role",
    roles: ["superadmin"],
})
</script>
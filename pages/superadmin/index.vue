<template>
    <h1>Noticias</h1>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: "role",
    roles: ["superadmin"],
})
</script>
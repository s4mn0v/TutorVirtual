<template>
    <h1>Administradores</h1>
    <Forms />
    <Table />
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: "role",
    roles: ["superadmin"],
})
</script>
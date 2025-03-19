<template>
    <h1>Docentes</h1>
    <Table />
</template>


<script setup lang="ts">
definePageMeta({
    layout: 'superadmin',
    middleware: "role",
    roles: ["superadmin"],
})
</script>
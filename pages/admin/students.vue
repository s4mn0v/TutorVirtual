<template>
    <div>
      <h1>Estudiantes</h1>
      
      <Table />
     
    </div>
</template>
  
  <script setup>
  definePageMeta({
    layout: 'admin',
  middleware: "role",
  roles: ["admin"],
  })
  </script>
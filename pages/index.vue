<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();

// Reactive variable to store tasks with explicit type
const tasks = ref<Task[]>([]);

// Function to load tasks
const fetchTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.error("Error fetching tasks:", error.message);
    return;
  }
  tasks.value = data as Task[]; // Cast data to Task[]
};

// Load tasks when the component is mounted
onMounted(fetchTasks);
</script>

<template>
  <div class="p-4">
    <NewsList />

    <h1 class="text-2xl font-bold mb-4">Pagina login</h1>
    <NuxtLink to="student" target="_blank">Ver Vista Estudiante</NuxtLink>
    <br>
    <NuxtLink to="teacher" target="_blank">Ver Vista Profesor</NuxtLink>
    <br>
    <NuxtLink to="admin" target="_blank">Ver Vista Admin</NuxtLink>
    <br>
    <NuxtLink to="superadmin" target="_blank">Ver Vista SuperAdmin</NuxtLink>


    <h1 class="text-2xl font-bold mb-4">Task List</h1>
    <ul v-if="tasks.length > 0">
      <li v-for="task in tasks" :key="task.id" class="p-2 mb-2 rounded-md shadow">
        {{ task.title }} | {{ task.id }} | {{ task.completed }} | {{ task.created_at }}
      </li>
    </ul>
    <p v-else>No tasks available.</p>
  </div>
</template>

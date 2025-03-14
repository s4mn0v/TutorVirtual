<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 flex flex-col bg-white dark:bg-gray-900">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 self-center">
        <img src="../../assets/img/logo-u.png" alt="Logo" class="h-10 w-auto dark:invert">
      </div>

      <!-- Navigation -->
      <nav class="mt-5 px-2 flex-1">
        <template v-for="(link, index) in links" :key="index">
          <!-- Dropdown -->
          <div v-if="link.children" class="mb-2">
            <button @click="toggleDropdown(index)" class="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg 
                     hover:bg-gray-200 hover:text-gray-900 
                     dark:hover:bg-gray-600 dark:hover:text-white">
              <span class="flex items-center">
                <UIcon :name="link.icon" size="20" class="mr-3 text-gray-700 dark:text-gray-300" />
                {{ link.label }}
              </span>
              <UIcon name="mdi:chevron-down" size="20" :class="dropdowns[index] ? 'rotate-180' : ''"
                class="text-gray-700 dark:text-gray-300" />
            </button>
            <div v-show="dropdowns[index]" class="pl-6 space-y-1">
              <NuxtLink v-for="(child, childIndex) in link.children" :key="childIndex" :to="child.to" class="block px-4 py-2 text-sm rounded-md 
                       hover:bg-gray-200 hover:text-gray-900 
                       dark:hover:bg-gray-600 dark:hover:text-white">
                <UIcon :name="child.icon" size="20" class="mr-3 text-gray-700 dark:text-gray-300" v-if="child.icon" />
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>

          <!-- Enlaces normales -->
          <NuxtLink v-else :to="link.to" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg 
                   hover:bg-gray-200 hover:text-gray-900 
                   dark:hover:bg-gray-600 dark:hover:text-white">
            <UIcon :name="link.icon" size="20" class="mr-3 text-gray-700 dark:text-gray-300" />
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Usuario</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">Carrera O Rol</p>
          </div>
          <Theme />
          <Logout class="bg-red-500 text-white" />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  links: Array
});

const dropdowns = ref({});

// Función para abrir/cerrar dropdowns
const toggleDropdown = (index) => {
  dropdowns.value[index] = !dropdowns.value[index];
};
</script>

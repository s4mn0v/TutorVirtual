<template>
  <!-- Use UCard for the main container -->
  <UCard>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
        Contenido del Curso
      </h2>
    </template>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-8 w-1/2" />
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <USkeleton v-for="i in 3" :key="i" class="h-32 w-full" />
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Error al cargar el contenido"
      description="No se pudieron obtener los materiales del curso. Por favor, inténtalo de nuevo más tarde."
    />

    <!-- Content Display -->
    <div v-else>
      <div v-if="materials.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <!-- Use UCard for each material item -->
        <UCard v-for="material in materials" :key="material.id">
          <template #header>
            <!-- Optional: Add an icon representing the material type? -->
            <h3 class="text-base font-semibold truncate text-gray-900 dark:text-white">
              {{ material.nombre }}
            </h3>
          </template>

          <!-- Material Type with Icon -->
          <div class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <UIcon name="i-heroicons-document-text" class="w-4 h-4 flex-shrink-0" />
            <span>{{ material.tipo }}</span>
            <!-- You could dynamically change the icon based on 'material.tipo' -->
            <!-- e.g., :name="getMaterialIcon(material.tipo)" -->
          </div>

          <!-- View Online Button -->
          <UButton
            :to="material.url"
            target="_blank"
            external
            icon="i-heroicons-arrow-top-right-on-square"
            label="Ver en línea"
            size="sm"
            variant="solid"
            color="primary"
            block
          />

          <!-- Removed "Temas principales" section -->
        </UCard>
      </div>

      <!-- No Materials Message -->
      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
        <UIcon name="i-heroicons-information-circle" class="w-12 h-12 mx-auto mb-2" />
        <p>No hay materiales disponibles en este momento.</p>
      </div>
    </div>

  </UCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// No need to import UCard, UButton etc. explicitly with Nuxt UI

interface Material {
  id: number;
  nombre: string;
  tipo: string; // Consider using a more specific type or enum if possible
  url: string;
}

const materials = ref<Material[]>([]);
const loading = ref<boolean>(true); // Start in loading state
const error = ref<boolean>(false); // Track error state

const fetchMaterials = async () => {
  loading.value = true;
  error.value = false; // Reset error on new fetch attempt
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay sesión activa");
      error.value = true;
      return;
    }

    // Use useFetch or $fetch (useFetch is often preferred for automatic ref handling, state management)
    const response = await $fetch<Material[]>('/api/students/materials', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    materials.value = response;

  } catch (err) {
    console.error("Error fetching materials:", err);
    error.value = true;
    materials.value = []; // Clear any potentially stale data
  } finally {
    loading.value = false; // Ensure loading is set to false in both success and error cases
  }
};

onMounted(() => {
  fetchMaterials();
});
</script>

<style scoped>
/* Optional: Add any component-specific styles here if needed */
/* Nuxt UI generally handles most styling */
</style>
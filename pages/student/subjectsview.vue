<template>
  <div>
    <!-- Contenedor flexible para alinear el título y los enlaces -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Mis Asignaturas</h1>
      <!-- Botón para agregar asignatura -->
      <button @click="isModalOpen = true"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        + Agregar Asignatura
      </button>
    </div>

    <!-- Modal para ingresar el código de la materia -->
    <div v-if="isModalOpen" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Insertar Código</h2>
        <input v-model="newSubjectCode" type="text" placeholder="Código de la materia"
          class="w-full p-2 border border-gray-300 rounded-lg mb-4 dark:bg-gray-700 dark:text-white" />
        <div class="flex justify-end">
          <button @click="registerSubject"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Registrar
          </button>
          <button @click="isModalOpen = false"
            class="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Componente SubjectCard -->
    <SubjectCard :subjects="subjects" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'studentwaiting',
  middleware: "role",
  roles: ["student"],
});

// Lista de asignaturas (vacía inicialmente)
const subjects = ref([]);

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false);

// Estado para almacenar el código de la nueva materia
const newSubjectCode = ref('');

// Función para registrar una nueva asignatura
const registerSubject = () => {
  if (newSubjectCode.value.trim() === '') {
    alert('Por favor, ingresa un código válido.');
    return;
  }

  // Simulación de búsqueda de la materia por código
  const newSubject = {
    name: 'Nueva Asignatura', // Puedes cambiar esto por una búsqueda real
    code: newSubjectCode.value,
    teacher: 'Profesor Nuevo', // Puedes cambiar esto por una búsqueda real
    journey: 'No definido', // Puedes cambiar esto por una búsqueda real
    expires: '2025-12-31', // Puedes cambiar esto por una búsqueda real
  };

  // Agregar la nueva asignatura a la lista
  subjects.value.push(newSubject);

  // Cerrar el modal y limpiar el campo de texto
  isModalOpen.value = false;
  newSubjectCode.value = '';
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
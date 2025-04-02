<template>
  <div class="calendar-container bg-white dark:bg-zinc-900 text-gray-900 dark:text-white p-4 sm:p-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Calendario -->
      <div class="flex-grow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl sm:text-2xl font-bold">
            {{ currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) }}
          </h2>
          <div class="flex space-x-2">
            <button @click="previousMonth"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="nextMonth"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1 mb-2 text-center">
          <div v-for="day in daysOfWeek" :key="day"
            class="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 py-1">
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <!-- Div del día: Ahora solo maneja el color de texto base y el hover -->
          <div v-for="{ date, isCurrentMonth, hasEvent, eventImportance } in calendarDays" :key="date.toISOString()"
            class="aspect-square flex flex-col items-center justify-center text-xs sm:text-sm relative group rounded-lg transition-all duration-200"
            :class="[
              // Color de texto base (depende si es del mes actual)
              isCurrentMonth ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500',
              // Hover: se aplica a toda la celda
              'hover:bg-gray-100 dark:hover:bg-zinc-700'
              // YA NO aplicamos getDayStyleClasses aquí
            ]">
            <!-- Span del número: Ahora recibe las clases de color/círculo -->
            <span :class="[
              // Primero, verifica si es hoy. Si lo es, aplica el estilo azul SIEMPRE.
              isToday(date)
                ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                // Si NO es hoy, verifica si hay un evento con importancia.
                // getDayNumberCircleClasses devuelve las clases del círculo coloreado o '' si no hay evento.
                : getDayNumberCircleClasses(eventImportance)
            ]">
              {{ date.getDate() }}
            </span>
            <!-- Ya no necesitamos el punto indicador -->
          </div>
        </div>
      </div>

      <!-- Recordatorios (Sin cambios aquí) -->
      <div class="w-full lg:w-1/3 mt-6 lg:mt-0">
        <h3 class="text-lg sm:text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-bell mr-2 text-blue-400"></i>
          Recordatorios
        </h3>
        <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
          <template v-if="eventos.length > 0">
            <div v-for="evento in eventos" :key="evento.id"
              class="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all duration-200 relative overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1.5" :class="getReminderBorderBgClass(evento.importancia)">
              </div>
              <div class="pl-4">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p :class="getReminderDateClass(evento.importancia)" class="text-xs sm:text-sm font-medium mb-1">
                      {{ formatDate(evento.date) }}
                    </p>
                    <h4 class="font-semibold text-sm sm:text-base">
                      {{ evento.title }}
                    </h4>
                  </div>
                </div>
                <p v-if="evento.description" class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-2">
                  {{ evento.description }}
                </p>
                <div class="mt-2 pt-2">
                  <span class="text-xs text-gray-500 dark:text-gray-500 font-medium">
                    {{ evento.asignatura.nombre }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-8">
            <i class="fas fa-calendar-day text-4xl text-gray-400 dark:text-gray-600 mb-2"></i>
            <p class="text-gray-500 dark:text-gray-400 text-sm">No hay recordatorios programados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Evento {
  id: number
  title: string
  date: string
  description: string
  importancia: string
  asignatura: {
    id: number
    nombre: string
  }
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  hasEvent: boolean;
  eventImportance?: string;
}

const eventos = ref<Evento[]>([])
const currentDate = ref(new Date())
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

interface ApiResponse {
  eventos: Evento[];
}

// --- Funciones de estilo para Recordatorios (sin cambios) ---
const getReminderBorderBgClass = (importancia: string): string => {
  // ... (igual que antes)
  switch (importancia?.toLowerCase()) {
    case 'alta': return 'bg-red-500 dark:bg-red-400';
    case 'media': return 'bg-yellow-500 dark:bg-yellow-400';
    case 'baja': return 'bg-blue-500 dark:bg-blue-400';
    default: return 'bg-gray-400 dark:bg-gray-500';
  }
};
const getReminderDateClass = (importancia: string): string => {
  // ... (igual que antes)
  switch (importancia?.toLowerCase()) {
    case 'alta': return 'text-red-600 dark:text-red-400';
    case 'media': return 'text-yellow-600 dark:text-yellow-400';
    case 'baja': return 'text-blue-600 dark:text-blue-400';
    default: return 'text-gray-500 dark:text-gray-400';
  }
};
// --- Fin Funciones de estilo para Recordatorios ---


// 1. Nueva Función para Clases CSS del Círculo del Número
const getDayNumberCircleClasses = (importance?: string): string => {
  // Clases base comunes para el círculo
  const baseCircleClasses = 'rounded-full w-6 h-6 flex items-center justify-center';

  if (!importance) {
    // Si no hay importancia (no hay evento), no retorna clases especiales
    // El número se mostrará con el color heredado del div padre
    return '';
  }

  switch (importance.toLowerCase()) {
    case 'alta':
      // Fondo rojo, texto blanco
      return `bg-red-500 dark:bg-red-600 text-white dark:text-white ${baseCircleClasses}`;
    case 'media':
      // Fondo amarillo, texto oscuro para contraste
      return `bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 ${baseCircleClasses}`;
    case 'baja':
      // Fondo azul, texto blanco
      return `bg-blue-500 dark:bg-blue-600 text-white dark:text-white ${baseCircleClasses}`;
    default:
      // Color por defecto (gris) si la importancia no coincide, texto blanco
      return `bg-gray-400 dark:bg-gray-500 text-white dark:text-white ${baseCircleClasses}`;
  }
};

// 3. Eliminar la función getDayStyleClasses (ya no se usa)
// const getDayStyleClasses = (importance?: string): string => { ... };


const fetchEvents = async () => {
  // ... (igual que antes)
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }
    const response = await $fetch<ApiResponse>('/api/students/calendar', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response && Array.isArray(response.eventos)) {
      eventos.value = response.eventos;
    }
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
}

const getEventForDate = (date: Date): Evento | undefined => {
  const dateString = date.toDateString();
  return eventos.value.find(evento =>
    new Date(evento.date).toDateString() === dateString
  );
}

// calendarDays Computed Property (sin cambios respecto a la versión anterior)
const calendarDays = computed<CalendarDay[]>(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: CalendarDay[] = [];

  // Días del mes anterior
  for (let i = 0; i < startingDayOfWeek; i++) {
    const date = new Date(year, month, i - startingDayOfWeek + 1);
    const eventOnDate = getEventForDate(date);
    days.push({
      date,
      isCurrentMonth: false,
      hasEvent: !!eventOnDate,
      eventImportance: eventOnDate?.importancia
    });
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const eventOnDate = getEventForDate(date);
    days.push({
      date,
      isCurrentMonth: true,
      hasEvent: !!eventOnDate,
      eventImportance: eventOnDate?.importancia
    });
  }

  // Días del mes siguiente
  const daysGenerated = days.length;
  const remainingDays = daysGenerated < 35 ? (35 - daysGenerated) : (42 - daysGenerated);

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    const eventOnDate = getEventForDate(date);
    days.push({
      date,
      isCurrentMonth: false,
      hasEvent: !!eventOnDate,
      eventImportance: eventOnDate?.importancia
    });
  }

  return days;
});

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const formatDate = (dateString: string) => {
  // ... (igual que antes)
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(fetchEvents)
</script>

<style scoped>
/* ... (tus estilos scoped permanecen igual) ... */
.calendar-container {
  min-height: calc(100vh - 4rem);
}

@media (min-width: 1024px) {
  .calendar-container {
    min-height: auto;
  }
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #4a5568;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 3px;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 transparent;
}

.dark .overflow-y-auto {
  scrollbar-color: #4a5568 transparent;
}
</style>
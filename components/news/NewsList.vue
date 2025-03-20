<template>
  <div>
    <UCard class="bg-transparent border-0">
      <template #header>
        <h2 class="text-xl font-bold">📰 Últimas noticias sobre Inteligencia Artificial</h2>
      </template>

      <div v-if="articles.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(article, index) in articles" :key="index" class="bg-gradient-to-br from-gray-700 to-black rounded-lg shadow-lg overflow-hidden">
          <!-- Imagen de la noticia -->
          <img :src="article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'" :alt="article.title"
            class="w-full h-40 object-cover" />

          <!-- Contenido de la tarjeta -->
          <div class="p-4 flex flex-col h-full">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold truncate">{{ article.title }}</h3>
              <UBadge color="primary" variant="soft">{{ article.source.name }}</UBadge>
            </div>

            <p class="text-sm text-gray-400 mt-2 line-clamp-3">
              {{ article.description || 'Descripción no disponible.' }}
            </p>

            <div class="flex items-center justify-between text-xs text-gray-500 mt-4">
              <span>{{ formatDate(article.publishedAt) }}</span>
              <ULink :to="article.url" target="_blank" rel="noopener noreferrer"
                class="text-indigo-400 hover:underline font-medium">
                Leer más →
              </ULink>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-else class="text-center text-gray-500 py-4">
        <p>Cargando noticias...</p>
        <UProgress class="mt-2" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
const { data } = await useFetch(
  `https://newsapi.org/v2/everything?q=Artificial%20Intelligence&language=es&sortBy=publishedAt&pageSize=6&apiKey=2c9f7c7c8aae4bcd804c86150ab2b3ec`
);

const articles = ref(data.value?.articles || []);

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>

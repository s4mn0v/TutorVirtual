<template>
  <div>
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">Últimas noticias de Inteligencia Artificial</h2>
      </template>

      <div v-if="articles.length" class="space-y-4">
        <div v-for="(article, index) in articles" :key="index" class="p-4 border-b dark:border-gray-700">
          <div class="flex flex-col space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-medium truncate">{{ article.title }}</span>
              <UBadge color="primary" variant="soft" class="ml-2">
                {{ article.source.name }}
              </UBadge>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {{ article.description || 'Descripción no disponible' }}
            </p>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ formatDate(article.publishedAt) }}</span>
              <ULink :to="article.url" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
                Leer más
              </ULink>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-4">
        <p>Cargando noticias...</p>
        <UProgress class="mt-2" />
      </div>
    </UCard>
  </div>
</template>

<script setup>
const { data } = await useFetch(
  `https://newsapi.org/v2/everything?q=Artificial%20Intelligence&language=es&sortBy=publishedAt&pageSize=5&apiKey=2c9f7c7c8aae4bcd804c86150ab2b3ec`
)

const articles = ref(data.value?.articles || [])

// Format date function
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
</script>

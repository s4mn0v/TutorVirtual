<template>
  <div class="p-4">
    <div class="bg-gradient-to-br from-gray-900 to-black">
      <div class="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold font-sans">TutorVirtual</h1>
          <a href="/login"
            class="flex items-center gap-2 px-3 py-2 leading-none text-gray-200 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
            Login
            <UIcon name="heroicons:arrow-right" class="w-5 h-5" />
          </a>
        </div>

        <div class="h-32 md:h-40"></div>

        <p class="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
          Explora, Aprende e Interactúa: Tu Tutor Virtual con IA
        </p>
        <div class="h-10"></div>
        <p class="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
          Chatea con la IA sobre los documentos de tus asignaturas y obtén respuestas en tiempo real.
        </p>

        <div class="h-32 md:h-40"></div>

        <div class="grid gap-8 md:grid-cols-2">
          <div class="flex flex-col justify-center">
            <p
              class="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
              Inteligencia que impulsa tu aprendizaje
            </p>
            <h2 class="text-4xl font-bold">Interactúa con tus documentos como nunca antes</h2>
            <div class="h-6"></div>
            <p class="font-serif text-xl text-gray-400 md:pr-10">
              Accede a materiales de tus asignaturas y conversa con la IA para obtener explicaciones, resúmenes,
              examenes, videos ejemplos y
              respuestas en tiempo real.
            </p>
          </div>
          <div>
            <div class="-mr-24 rounded-full h-96 flex justify-center items-center">
              <img
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/IO24_WhatsInAName_Hero_1.width-1200.format-webp.webp"
                alt="Tutor IA" class="w-4/5 h-4/5 object-contain rounded-full">
            </div>
          </div>
        </div>

        <div class="h-32 md:h-40"></div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="flex flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
            <p
              class="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14">
              1
            </p>
            <div class="h-6"></div>
            <p class="text-3xl">Accede a los archivos</p>
            <p class="text-gray-400 mt-2">
              IA adaptada a tus necesidades y preguntas, ayudándote a comprender mejor los temas.
            </p>
          </div>
          <div class="flex flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
            <p
              class="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14">
              2
            </p>
            <div class="h-6"></div>
            <p class="text-3xl">Interactúa con la IA</p>
            <p class="text-gray-400 mt-2">
              Haz preguntas sobre los documentos y recibe explicaciones detalladas, resúmenes o análisis instantáneos.
            </p>
          </div>
          <div class="flex flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
            <p
              class="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14">
              3
            </p>
            <div class="h-6"></div>
            <p class="text-3xl">Aprende a tu ritmo</p>
            <p class="text-gray-400 mt-2">
              Accede en cualquier momento para reforzar tus conocimientos con el soporte de la IA, sin
              esperar ayuda externa.
            </p>
          </div>
        </div>

        <div class="h-32 md:h-40"></div>

        <p class="font-serif text-4xl text-center">
          <span class="text-gray-400">Team Work</span>
          <span class="text-gray-600">Makes Dream Work</span>
        </p>

        <div class="h-40"></div>

        <div class="grid gap-8 md:grid-cols-3">
          <div class="flex flex-col justify-center md:col-span-2">
            <p
              class="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600">
              Noticias en tiempo real
            </p>
            <h2 class="text-4xl font-bold">Explora las últimas novedades en IA</h2>
            <div class="h-6"></div>
            <p class="font-serif text-xl text-gray-400 md:pr-10">
              Accede a las noticias más recientes sobre Inteligencia Artificial desde fuentes confiables.
              Pregunta al tutor virtual sobre los avances, tendencias y debates actuales.
            </p>
            <div class="h-8"></div>
            <div class="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
              <div>
                <p class="font-semibold text-gray-400">Fuentes confiables</p>
                <div class="h-4"></div>
                <p class="font-serif text-gray-400">
                  Recibe noticias de medios reconocidos sobre IA y mantente informado con información actualizada.
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-400">Interacción con IA</p>
                <div class="h-4"></div>
                <p class="font-serif text-gray-400">
                  Haz preguntas sobre los artículos y obtén resúmenes, análisis y explicaciones en tiempo real.
                </p>
              </div>
              <div>
                <p class="font-semibold text-gray-400">Aprendizaje continuo</p>
                <div class="h-4"></div>
                <p class="font-serif text-gray-400">
                  Mejora tu comprensión sobre IA con respuestas inteligentes basadas en fuentes de noticias recientes.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              class="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96 flex justify-center items-center">
              <img
                src="https://i0.wp.com/newsdata.io/blog/wp-content/uploads/2024/01/Snipaste_2021-11-28_13-55-49.jpg?fit=701%2C351&ssl=1"
                alt="Noticias IA" class="w-4/5 h-4/5 object-cover rounded-full">
            </div>
          </div>
        </div>

        <div class="h-10 md:h-40"></div>

        <NewsList />

        <div class="h-10 md:h-40"></div>

        <div class="grid gap-4 md:grid-cols-4">
          <ul class="space-y-1 text-gray-400">
            <li class="pb-4 font-serif text-gray-400">Social</li>
            <li>
              <a href="#" class="hover:underline flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                  <path fill="currentColor"
                    d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.6 17.6 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4c0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8c11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1 8.7-45.6 23-61.6c-2.3-5.8-10-29.2 2.2-60.8a18.6 18.6 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.2 208.2 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.6 18.6 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8c14.3 16.1 23 36.6 23 61.6c0 88.2-52.4 107.6-102.3 113.3c8 7.1 15.2 21.1 15.2 42.5c0 30.7-.3 55.5-.3 63c0 5.4 3.1 11.5 11.4 11.5a19.4 19.4 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7C480 134.9 379.7 32 256 32" />
                </svg>
                <span>Github</span>
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                  <path fill="currentColor"
                    d="M511 4c138 0 155 1 209 3c53 2 90 11 123 24c34 13 62 30 90 58s45 56 58 90c13 33 22 70 24 123c2 54 3 71 3 209s-1 155-3 209c-2 53-11 90-24 123c-13 34-30 62-58 90s-56 45-90 58c-33 13-70 22-123 24c-54 2-71 3-209 3s-155-1-209-3c-53-2-90-11-123-24c-34-13-62-30-90-58s-45-56-58-90C18 810 9 773 7 720c-2-54-3-71-3-209s1-155 3-209c2-53 11-90 24-123c13-34 30-62 58-90s56-45 90-58c33-13 70-22 123-24c54-2 71-3 209-3m0 66c-144 0-161 1-217 3c-52 2-81 12-100 19c-49 20-82 53-102 102c-7 19-17 48-19 100c-2 56-3 73-3 217s1 161 3 217c2 52 12 81 19 100c20 49 53 82 102 102c19 7 48 17 100 19c56 2 73 3 217 3s161-1 217-3c52-2 81-12 100-19c49-20 82-53 102-102c7-19 17-48 19-100c2-56 3-73 3-217s-1-161-3-217c-2-52-12-81-19-100c-20-49-53-82-102-102c-19-7-48-17-100-19c-56-2-73-3-217-3m0 644c112 0 203-91 203-203s-91-203-203-203s-203 91-203 203s91 203 203 203m0-463c144 0 260 116 260 260S655 771 511 771S251 655 251 511s116-260 260-260m332-10c0 34-28 60-62 60s-60-26-60-60s26-62 60-62s62 28 62 62" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
          <ul class="space-y-1 text-gray-400">
            <li class="pb-4 font-serif text-gray-400">Ubicación</li>
            <li>
              <a href="#" class="hover:underline flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor"
                      d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 2a7 7 0 0 0-7 7c0 2.322 1.272 4.36 2.871 5.996a18 18 0 0 0 2.222 1.91l.458.326q.222.155.427.288l.39.25l.343.209l.289.169l.455-.269l.367-.23q.293-.186.627-.417l.458-.326a18 18 0 0 0 2.222-1.91C17.728 15.361 19 13.322 19 11a7 7 0 0 0-7-7m0 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4" />
                  </g>
                </svg>
                <span>Bogota</span>
              </a>
            </li>
          </ul>
          <ul class="space-y-1 text-gray-400">
            <li class="pb-4 font-serif text-gray-400">Compañia</li>
            <li>
              <a href="#" class="hover:underline">Sitio Oficial Consultorio</a>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <h1 class="text-2xl font-bold mb-4 text-center">Enlaces de Vistas</h1>
    <div class="flex justify-between">
      <NuxtLink to="student" target="_blank">Ver Vista Estudiante</NuxtLink>
      <br>
      <NuxtLink to="teacher" target="_blank">Ver Vista Profesor</NuxtLink>
      <br>
      <NuxtLink to="admin" target="_blank">Ver Vista Admin</NuxtLink>
      <br>
      <NuxtLink to="superadmin" target="_blank">Ver Vista SuperAdmin</NuxtLink>
    </div>
  </div>
</template>

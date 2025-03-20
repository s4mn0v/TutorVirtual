<template>
  <ClientOnly>
    <div class="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden"
      @mousemove="updateMousePosition">
      <!-- Fondo animado -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 animate-fade"></div>
      <div v-for="(particle, index) in particles" :key="index"
        class="absolute w-2 h-2 bg-indigo-500 opacity-50 blur-md rounded-full pointer-events-none" :style="{
          top: particle.y + 'px',
          left: particle.x + 'px',
          animationDuration: particle.speed + 's',
          animationDelay: particle.delay + 's'
        }"></div>

      <!-- Efecto de luz dinámica -->
      <div class="absolute w-40 h-40 bg-indigo-700 opacity-30 blur-3xl rounded-full pointer-events-none"
        :style="{ top: mouseY + 'px', left: mouseX + 'px', transform: 'translate(-50%, -50%)' }"></div>

      <!-- Formulario -->
      <div class="bg-gray-900 p-8 rounded-2xl shadow-lg w-96 relative z-10 neon-border">
        <h2 class="text-white text-2xl font-semibold text-center mb-4">Iniciar sesión</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="email">Correo</label>
            <input v-model="email" type="email" id="email"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <div class="mb-4">
            <label class="text-gray-400 text-sm" for="password">Contraseña</label>
            <input v-model="password" type="password" id="password"
              class="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring focus:ring-indigo-500"
              required />
          </div>
          <button type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-2 rounded-md transition">
            Ingresar
          </button>
        </form>
        <p v-if="errorMsg" class="text-red-500 mt-2 text-center">{{ errorMsg }}</p>
        <p class="mt-4 text-gray-400 text-center">¿No tienes cuenta? <NuxtLink to="/register" class="text-indigo-500">
            Regístrate aquí</NuxtLink>
        </p>
      </div>
    </div>
  </ClientOnly>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupabaseClient, useRouter } from "#imports";

definePageMeta({ ssr: false });

const supabase = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const mounted = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const particles = ref<{ x: number; y: number; speed: number; delay: number }[]>([]);

const updateMousePosition = (event: MouseEvent) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

onMounted(() => {
  mounted.value = true;
  for (let i = 0; i < 50; i++) {
    particles.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() * 5 + 2,
      delay: Math.random() * 5
    });
  }
});

async function login() {
  errorMsg.value = "";
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    errorMsg.value = "Error obteniendo el usuario.";
    return;
  }

  const userId = userData.user.id;
  const { data: student } = await supabase.from("students").select("id").eq("id", userId).maybeSingle();
  const { data: teacher } = await supabase.from("teachers").select("id").eq("id", userId).maybeSingle();
  const { data: admin } = await supabase.from("admins").select("id").eq("id", userId).maybeSingle();
  const { data: superadmin } = await supabase.from("superadmins").select("id").eq("id", userId).maybeSingle();

  if (student) {
    router.push("/student");
  } else if (teacher) {
    router.push("/teacher");
  } else if (admin) {
    router.push("/admin");
  } else if (superadmin) {
    router.push("/superadmin");
  } else {
    errorMsg.value = "No tienes un rol asignado.";
  }
}
</script>
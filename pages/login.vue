<script setup lang="ts">
import { useSupabaseClient, useRouter } from "#imports";

definePageMeta({ ssr: false });

const supabase = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

async function login(event?: Event) {
  errorMsg.value = "";

  // Iniciar sesión con Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  // Obtener usuario autenticado
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    errorMsg.value = "Error obteniendo el usuario.";
    return;
  }

  const userId = userData.user.id;

  // Consultar las tablas de roles (usamos .maybeSingle() para evitar errores si no hay datos)
  const { data: student } = await supabase.from("students").select("id").eq("id", userId).maybeSingle();
  const { data: teacher } = await supabase.from("teachers").select("id").eq("id", userId).maybeSingle();
  const { data: admin } = await supabase.from("admins").select("id").eq("id", userId).maybeSingle();
  const { data: superadmin } = await supabase.from("superadmins").select("id").eq("id", userId).maybeSingle();

  // Redirigir según el rol encontrado
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


<template>
  <ClientOnly>
    <div v-if="mounted" class="p-4">
      <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>

      <UForm :state="{ email, password }" class="space-y-4" @submit="login">
        <!-- Añadir name y autocomplete -->
        <UInput name="email" autocomplete="email" v-model="email" type="email" placeholder="Correo" required />

        <UInput name="password" autocomplete="current-password" v-model="password" type="password"
          placeholder="Contraseña" required />

        <UButton type="submit" color="success" block>
          Ingresar
        </UButton>

        <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
      </UForm>
    </div>
  </ClientOnly>
</template>

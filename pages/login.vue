<script setup lang="ts">
import { useSupabaseClient } from "#imports";

definePageMeta({ ssr: false });

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

async function login(event?: Event) {
  errorMsg.value = "";

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single<Profile>();

  if (profile) {
    switch (profile.role) {
      case "superadmin":
        await navigateTo("/superadmin");
        break;
      case "admin":
        await navigateTo("/admin");
        break;
      case "teacher":
        await navigateTo("/teacher");
        break;
      case "student":
        await navigateTo("/student");
        break;
      default:
        await navigateTo("/login");
        break;
    }
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

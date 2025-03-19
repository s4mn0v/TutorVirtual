import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSupabaseClient, useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }

  // Obtener el rol del usuario con tipado correcto
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.value.id)
    .single<ProfileRole>();

  if (error || !profile) {
    return navigateTo("/login");
  }

  const userRole = profile.role;
  const allowedRoles = to.meta.roles as string[]; // Obtener roles permitidos desde la metadata

  if (!allowedRoles.includes(userRole)) {
    return navigateTo("/login"); // Si el rol no está permitido, redirigir
  }
});

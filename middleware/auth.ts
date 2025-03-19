import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();

  // Si el usuario no está autenticado, redirigir a login
  if (!user.value) {
    return navigateTo("/login");
  }
});

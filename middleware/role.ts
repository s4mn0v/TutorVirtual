import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSupabaseClient, useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/login");
  }

  const userId = user.value.id;

  // Consultar las tablas de roles para encontrar a qué rol pertenece el usuario
  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  const { data: teacher } = await supabase
    .from("teachers")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  const { data: superadmin } = await supabase
    .from("superadmins")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  let userRole = "";

  if (student) userRole = "student";
  else if (teacher) userRole = "teacher";
  else if (admin) userRole = "admin";
  else if (superadmin) userRole = "superadmin";
  else return navigateTo("/login"); // Si no tiene rol, redirigir a login

  // Obtener roles permitidos desde la metadata de la ruta
  const allowedRoles = to.meta.roles as string[];

  // Si el usuario no tiene permiso para acceder, redirigirlo
  if (!allowedRoles.includes(userRole)) {
    return navigateTo("/login");
  }
});

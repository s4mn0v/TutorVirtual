import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const body = await readBody(event); // Obtener datos enviados desde el frontend

  try {
    // Obtener usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user)
      throw createError({ statusCode: 401, message: "Not authenticated" });

    // Validar que se envíen los datos del estudiante
    const { last_name, document_id, career } = body;
    if (!last_name || !document_id || !career) {
      throw createError({
        statusCode: 400,
        message: "Faltan datos del estudiante",
      });
    }

    // Verificar si el usuario ya existe en la tabla de estudiantes
    const { data: existingStudent } = await supabase
      .from("students")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingStudent) {
      const { error: insertError } = await supabase.from("students").insert([
        {
          id: user.id,
          last_name,
          document_id,
          career,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (error) {
    return createError({
      statusCode: (error as { statusCode?: number }).statusCode || 500,
      statusMessage:
        (error as { message?: string }).message || "Error en la confirmación",
    });
  }
});

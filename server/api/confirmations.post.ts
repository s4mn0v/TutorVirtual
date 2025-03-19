// server/api/confirmations.post.ts
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event); // Await the promise

  try {
    // Obtain authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user)
      throw createError({ statusCode: 401, message: "Not authenticated" });

    // Check for profile existence
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          role: "student",
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (error) {
    const errorMessage =
      (error as { message?: string }).message || "Confirmation error";
    return createError({
      statusCode: (error as { statusCode?: number }).statusCode || 500,
      statusMessage: errorMessage,
    });
  }
});

// server/api/students/calendar.get.ts
import { PrismaClient } from "@prisma/client";
import { defineEventHandler, createError, getRequestHeader } from "h3";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getRequestHeader(event, "authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        message: "No se proporcionó un token de autenticación válido",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "fallback_secret"; // Usa fallback si no está definida

    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw createError({
        statusCode: 401,
        message: "Token inválido o expirado",
      });
    }

    const estudiante = await prisma.estudiante.findUnique({
      where: { id: decodedToken.userId },
      include: {
        asignatura: {
          include: {
            recordatorios: {
              orderBy: {
                fecha: "asc",
              },
              select: {
                id: true,
                titulo: true,
                descripcion: true,
                fecha: true,
                importancia: true, // <--- AÑADIR ESTA LÍNEA
                asignatura: {
                  select: {
                    id: true,
                    nombre: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!estudiante || !estudiante.asignatura) {
      // Verificar también asignatura
      // Si no hay estudiante o no está asignado a ninguna asignatura, devolver vacío
      return {
        eventos: [],
        asignaturas: [],
      };
    }

    const eventos = estudiante.asignatura.recordatorios.map((recordatorio) => ({
      id: recordatorio.id,
      title: recordatorio.titulo,
      date: recordatorio.fecha.toISOString(),
      description: recordatorio.descripcion,
      importancia: recordatorio.importancia, // <--- AÑADIR ESTA LÍNEA
      asignatura: {
        id: recordatorio.asignatura.id,
        nombre: recordatorio.asignatura.nombre,
      },
    }));

    const asignaturas = [
      {
        id: estudiante.asignatura.id,
        nombre: estudiante.asignatura.nombre,
      },
    ];

    return {
      eventos,
      asignaturas,
    };
  } catch (error) {
    console.error("Error al obtener eventos del calendario:", error);
    // Devuelve un error estandarizado para que el frontend pueda manejarlo
    throw createError({
      statusCode: 500,
      message:
        "Error interno del servidor al obtener los eventos del calendario.",
      data: error instanceof Error ? error.message : String(error), // Opcional: enviar mensaje de error original en desarrollo
    });
  } finally {
    await prisma.$disconnect(); // Asegurar desconexión de Prisma
  }
});

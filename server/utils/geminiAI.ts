// server/utils/geminiAI.ts
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import type { Part } from "@google/generative-ai";
import { extractDocumentContent } from "./documentExtractor";
// Ensure Buffer is available (usually is in Node.js environments like Nuxt server routes)
// If you encounter 'Buffer is not defined', you might need: import { Buffer } from 'node:buffer';
import { Buffer } from "node:buffer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const cache = new Map<string, string[]>(); // Cache en memoria para evitar solicitudes duplicadas

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeDocument(
  url: string,
  tipo: string // e.g., "image/jpeg", "image/png", "text/plain" etc.
): Promise<string[]> {
  try {
    const cacheKey = `${url}-${tipo}`;
    if (cache.has(cacheKey)) {
      console.log(`Cache hit for: ${cacheKey}`); // Optional: Log cache hits
      return cache.get(cacheKey)!;
    }
    console.log(`Cache miss for: ${cacheKey}. Fetching and analyzing...`); // Optional: Log cache misses

    const content = await extractDocumentContent(url, tipo); // Assuming this returns the URL for images/text content directly
    let model: GenerativeModel;
    let prompt: string | (string | Part)[];

    if (tipo.includes("image")) {
      model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      // 1. Fetch the image data as an ArrayBuffer
      const imageResponse = await fetch(content); // 'content' should be the image URL here
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image from ${content}: ${imageResponse.statusText}`);
      }
      const imageArrayBuffer = await imageResponse.arrayBuffer();

      // 2. Convert the ArrayBuffer to a Base64 string
      const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

      // 3. Create the Part object with the Base64 string
      const imagePart: Part = {
        inlineData: {
          data: base64ImageData, // Use the Base64 string here
          mimeType: tipo,         // Ensure 'tipo' is the correct MIME type (e.g., "image/jpeg")
        },
      };

      prompt = [
        "Analiza esta imagen y lista los 5 principales temas o conceptos.",
        imagePart,
      ];
    } else {
      // Assuming 'content' is the actual text content for non-image types
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
      prompt = `Lista los 5 temas principales de este texto:\n\n${content}\n\nSolo la lista, sin texto adicional.`;
    }

    return await fetchWithRetries(model, prompt, cacheKey);
  } catch (error) {
    console.error(`Error al analizar '${url}' (${tipo}):`, error);
    return [`Error: ${error instanceof Error ? error.message : "Desconocido"}`];
  }
}

async function fetchWithRetries(
  model: GenerativeModel,
  prompt: string | (string | Part)[],
  cacheKey: string,
  retries = 3,
  delayMs = 5000 // Start with a longer delay for rate limits
): Promise<string[]> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1} for ${cacheKey}`); // Log attempt
      const result = await model.generateContent(prompt);
      const response = await result.response;

      // Add check for blocked content
      if (response.promptFeedback?.blockReason) {
          console.warn(`Content blocked for ${cacheKey}: ${response.promptFeedback.blockReason}`);
          // Decide how to handle blocked content (e.g., return specific message or throw)
          return [`Error: Contenido bloqueado (${response.promptFeedback.blockReason})`];
      }

      const text = response.text();
      const topics = text
        .split("\n")
        .map(line => line.replace(/^- |^\* |^\d+\. /,'').trim()) // Clean up list markers
        .filter((line) => line.trim() !== "")
        .slice(0, 5);

      if (topics.length === 0 && text.trim() !== '') {
         console.warn(`Could not parse topics for ${cacheKey}. Raw response: "${text}"`);
         // Optionally return the raw text if parsing fails but text exists
         // return [text.trim()];
         return ["Error: No se pudieron extraer temas."]; // Or return a generic error
      }

      console.log(`Analysis successful for ${cacheKey}. Caching result.`); // Log success
      cache.set(cacheKey, topics); // Guarda en cache para evitar repeticiones
      return topics;
    } catch (error: any) {
        // Check for specific Google API errors if possible, otherwise check status
        // Example: error?.response?.status === 429 or error?.message?.includes('429')
      if (error.message?.includes('429') || error.status === 429) { // More robust check for 429
        console.warn(
          `Límite de solicitudes alcanzado (429) for ${cacheKey}. Reintentando en ${delayMs}ms... (Intento ${
            attempt + 1
          }/${retries})`
        );
        if (attempt === retries - 1) { // Check if it's the last attempt
            console.error(`Max retries reached for ${cacheKey} due to 429 errors.`);
            throw new Error("Se alcanzó el máximo de reintentos debido a errores 429.");
        }
        await delay(delayMs);
        delayMs *= 2; // Aumenta el tiempo de espera exponencialmente
      } else {
        // Log other errors before throwing
        console.error(`Non-retryable error during API call for ${cacheKey} (Attempt ${attempt + 1}):`, error);
        throw error; // Re-throw other errors immediately
      }
    }
  }
  // This should theoretically not be reached if the last retry throws, but added for safety
  console.error(`Failed to get response for ${cacheKey} after all retries.`);
  throw new Error("Se alcanzó el máximo de reintentos sin éxito.");
}
import { z } from "zod";

export const projectSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede tener más de 100 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "El nombre no puede ser solo espacios en blanco"),

    description: z.string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede tener más de 500 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "La descripción no puede ser solo espacios en blanco"),

    category: z.string()
        .trim()
        .nonempty("Selecciona una categoría"),

    status: z.string()
        .trim()
        .nonempty("Selecciona un estado"),

    technologies: z.string()
        .trim()
        .min(3, "Describe al menos algunas tecnologías")
        .max(200, "Las tecnologías no pueden tener más de 200 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "Las tecnologías no pueden ser solo espacios en blanco")
});

export const createProjectSchema = projectSchema;
export const updateProjectSchema = projectSchema.partial();
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.flatten().fieldErrors;
            throw new Error(JSON.stringify(formattedErrors));
        }
        throw error;
    }
}
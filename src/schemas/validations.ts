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

export const gameSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede tener más de 100 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "El nombre no puede ser solo espacios en blanco"),

    category: z.string()
        .trim()
        .min(3, " debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede tener más de 100 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "El nombre no puede ser solo espacios en blanco"),

    description: z.string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede tener más de 500 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "La descripción no puede ser solo espacios en blanco"),
});

export const loginSchema = z.object({
    user: z.string()
        .trim()
        .min(3, "El usuario debe tener al menos 3 caracteres")
        .max(50, "El usuario no puede tener más de 50 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "El usuario no puede ser solo espacios en blanco"),

    password: z.string()
        .trim()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(100, "La contraseña no puede tener más de 100 caracteres")
        .refine(val => val.replace(/\s/g, '').length > 0, "La contraseña no puede ser solo espacios en blanco"),
});


export const registerSchema = z
    .object({
        user: z
            .string()
            .trim()
            .min(3, "El usuario debe tener al menos 3 caracteres")
            .max(50, "El usuario no puede tener más de 50 caracteres")
            .refine((val) => val.replace(/\s/g, "").length > 0, "El usuario no puede ser solo espacios en blanco"),

        password: z
            .string()
            .trim()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .max(100, "La contraseña no puede tener más de 100 caracteres")
            .refine((val) => val.replace(/\s/g, "").length > 0, "La contraseña no puede ser solo espacios en blanco"),

        confirmPassword: z
            .string()
            .trim()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .max(100, "La contraseña no puede tener más de 100 caracteres")
            .refine((val) => val.replace(/\s/g, "").length > 0, "La contraseña no puede ser solo espacios en blanco"),
        
        answer1: z
            .string()
            .trim()
            .min(2, "La respuesta debe tener al menos 2 caracteres")
            .max(100, "La respuesta no puede tener más de 100 caracteres")
            .refine((val) => val.replace(/\s/g, "").length > 0, "La pregunta no puede ser solo espacios en blanco"),
        answer2: z
            .string()
            .trim()
            .min(2, "La respuesta debe tener al menos 2 caracteres")
            .max(100, "La respuesta no puede tener más de 100 caracteres")
            .refine((val) => val.replace(/\s/g, "").length > 0, "La pregunta no puede ser solo espacios en blanco"),
    })




export const profileSchema = z.object({
      email: z.string().email("El email debe ser válido"),
      password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
      confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres"),
    });

export const emailSchema = z.object({
    email: z.string().email("El email debe ser válido"),
});

export const passwordSchema = z.object({
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres"),
});
    

export const createProjectSchema = projectSchema;
export const updateProjectSchema = projectSchema.partial();
export const createGameSchema = gameSchema;
export const updateGameSchema = gameSchema.partial();
export const loginValidationSchema = loginSchema;

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

export const resetPasswordSchema = z
  .object({
    password: z.string().trim().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
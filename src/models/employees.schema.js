import { z } from "zod";

export const employeeSchema = z.object({
    nombre: z.string().nonempty(),
    salario: z.number().nonnegative(),
    apellidos: z.string().nullable(),
})
import { z } from "zod";

export const usersSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
})
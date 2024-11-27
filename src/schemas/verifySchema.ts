import {z} from "zod";

export const verifySchema = z.object({

    code: z.string().length(6,'varification code must be atleast 6 digit')
})